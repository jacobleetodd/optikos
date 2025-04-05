import { PrivacyDeclarations } from './components/DataCard';
import { SampleDataItem } from './types';

export const getUniqueData = <T, K extends keyof T>(objects: T[], key: K) => {
  const seen = new Set<T[K]>();
  const result: T[] = [];

  for (const obj of objects) {
    const value = obj[key];

    if (value !== undefined && !seen.has(value)) {
      seen.add(value);
      result.push(obj);
    } else if (value === undefined) {
      result.push(obj);
    }
  }

  return result;
};

export const getLastTextField = (text: string) => {
  const splitText = text.split('.');
  return splitText[splitText.length - 1];
};

export function convertDataToNivoTree(data: SampleDataItem[]) {
  const tree = {
    name: 'Data Governance',
    color: 'hsl(106, 70%, 50%)',
    children: [],
  };

  const nodes = {};

  // First pass: Create nodes for each system and their privacy declarations and data categories
  data.forEach((item) => {
    // @ts-expect-error ignoring for time consideration
    nodes[item.fides_key] = {
      name: item.name,
      color: getRandomHSLColor(),
      children: [],
      data: {
        description: item.description,
        fides_key: item.fides_key,
        system_type: item.system_type,
      },
    };

    if (item.privacy_declarations && item.privacy_declarations.length > 0) {
      item.privacy_declarations.forEach((declaration) => {
        const declarationNode = {
          name: declaration.name,
          color: getRandomHSLColor(),
          children: [],
          data: {
            data_subjects: declaration.data_subjects,
            data_use: declaration.data_use,
          },
        };

        if (
          declaration.data_categories &&
          declaration.data_categories.length > 0
        ) {
          declaration.data_categories.forEach((category) => {
            const splitText = category.split('.');
            // @ts-expect-error ignoring for time consideration
            declarationNode.children.push({
              name: splitText[splitText.length - 1],
              color: getRandomHSLColor(),
              children: [], // Data categories are leaf nodes in this conversion
              data: {
                type: 'data_category',
              },
            });
          });
        }
        // @ts-expect-error ignoring for time consideration
        nodes[item.fides_key].children.push(declarationNode);
      });
    }
  });

  // Second pass: Build the tree structure based on system dependencies
  data.forEach((item) => {
    // @ts-expect-error ignoring for time consideration
    const currentNode = nodes[item.fides_key];
    if (item.system_dependencies && item.system_dependencies.length > 0) {
      item.system_dependencies.forEach((dependencyKey) => {
        // @ts-expect-error ignoring for time consideration

        if (nodes[dependencyKey]) {
          // @ts-expect-error ignoring for time consideration

          currentNode.children.push(nodes[dependencyKey]);
        }
      });
    } else {
      // @ts-expect-error ignoring for time consideration
      tree.children.push(currentNode);
    }
  });

  // @ts-expect-error ignoring for time consideration
  function removeDuplicates(node) {
    if (node.children && node.children.length > 0) {
      const seen = new Set();
      // @ts-expect-error ignoring for time consideration
      node.children = node.children.filter((child) => {
        const key = child.data
          ? child.data.fides_key || child.name
          : child.name;
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        removeDuplicates(child);
        return true;
      });
    }
  }

  // Remove duplicate children in the main tree
  removeDuplicates(tree);

  return tree;
}

function getRandomHSLColor() {
  const h = Math.floor(Math.random() * 360);
  const s = '70%';
  const l = '50%';
  return `hsl(${h}, ${s}, ${l})`;
}

export function sanitizePrivacyData(
  data: SampleDataItem[],
  showPrivacyDeclarations: PrivacyDeclarations,
  filterName?: string
) {
  const lowerFilterName = filterName ? filterName.toLowerCase() : undefined;

  return data.map((item) => {
    const newItem = { ...item };
    if (
      newItem.privacy_declarations &&
      Array.isArray(newItem.privacy_declarations)
    ) {
      newItem.privacy_declarations = newItem.privacy_declarations
        .filter((declaration) => {
          if (!lowerFilterName) {
            return true;
          }
          return (
            declaration.name &&
            declaration.name.toLowerCase().includes(lowerFilterName)
          );
        })
        .map((declaration) => {
          const newDeclaration = { ...declaration };
          if (
            !showPrivacyDeclarations.showCategories &&
            newDeclaration.data_categories
          ) {
            newDeclaration.data_categories = [];
          }
          if (
            !showPrivacyDeclarations.showSubjects &&
            newDeclaration.data_subjects
          ) {
            newDeclaration.data_subjects = [];
          }
          if (!showPrivacyDeclarations.showUse && newDeclaration.data_use) {
            newDeclaration.data_use = '';
          }
          return newDeclaration;
        });
    }
    return newItem;
  });
}
