import { FC } from 'react';
import { SampleDataItem } from '../types';
import { ResponsiveTree } from '@nivo/tree';
import { convertDataToNivoTree } from '../utilities';

interface TreeChartProps {
  data: SampleDataItem[];
}

export const TreeChart: FC<TreeChartProps> = ({ data }) => (
  /**
   * NOTE: this was copied from the nivo site and modified to satisfy ts by copilot for demonstration purposes.
   */
  <ResponsiveTree
    activeLinkThickness={8}
    activeNodeSize={24}
    data={convertDataToNivoTree(data)}
    fixNodeColorAtDepth={1}
    identity="name"
    inactiveLinkThickness={2}
    inactiveNodeSize={12}
    layout="left-to-right"
    linkColor={{
      from: 'target.color',
      modifiers: [['opacity', 0.4]],
    }}
    linkThickness={2}
    linkTooltip={() => <div />}
    linkTooltipAnchor="center"
    margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
    meshDetectionRadius={80}
    motionConfig="stiff"
    nodeColor={{ scheme: 'tableau10' }}
    onLinkClick={() => {}}
    onLinkMouseEnter={() => {}}
    onLinkMouseLeave={() => {}}
    onLinkMouseMove={() => {}}
    onNodeClick={() => {}}
    onNodeMouseEnter={() => {}}
  />
);
