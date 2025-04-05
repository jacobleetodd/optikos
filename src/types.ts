export interface SampleDataItem {
  description: string;
  fides_key: string;
  name: string;
  privacy_declarations: PrivacyDeclaration[];
  system_dependencies?: SystemDependency[];
  system_type: SystemType;
}

export interface PrivacyDeclaration {
  data_categories: string[];
  data_use: string;
  data_subjects: string[];
  name: string;
}

export type SystemType = 'Application' | 'Service' | 'Database' | 'Integration';

export type SystemDependency =
  | 'advertising_integration'
  | 'analytics_integration'
  | 'app_database'
  | 'authentication_service'
  | 'backup_service'
  | 'email_integration'
  | 'file_storage_service'
  | 'logging_service'
  | 'monitoring_service'
  | 'notification_service'
  | 'orders_service'
  | 'payments_integration'
  | 'payment_gateway'
  | 'reporting_service'
  | 'search_database'
  | 'user_management_service';
