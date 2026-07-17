export type AwsServiceCategory =
  | "Compute"
  | "Storage"
  | "Database"
  | "Networking & Content Delivery"
  | "Security, Identity & Compliance"
  | "Management & Governance"
  | "Analytics"
  | "Machine Learning"
  | "Developer Tools";

export type AwsService = {
  id: string;
  name: string;
  shortName: string;
  category: AwsServiceCategory;
  description: string;
};

export const CATEGORY_COLORS: Record<AwsServiceCategory, string> = {
  Compute: "bg-orange-500",
  Storage: "bg-emerald-600",
  Database: "bg-blue-600",
  "Networking & Content Delivery": "bg-purple-600",
  "Security, Identity & Compliance": "bg-red-600",
  "Management & Governance": "bg-pink-600",
  Analytics: "bg-indigo-600",
  "Machine Learning": "bg-teal-600",
  "Developer Tools": "bg-slate-600",
};

const SERVICES: AwsService[] = [
  {
    id: "ec2",
    name: "EC2",
    shortName: "EC2",
    category: "Compute",
    description: "Virtual servers in the cloud",
  },
  {
    id: "lambda",
    name: "Lambda",
    shortName: "λ",
    category: "Compute",
    description: "Run code without thinking about servers",
  },
  {
    id: "ecs",
    name: "Elastic Container Service",
    shortName: "ECS",
    category: "Compute",
    description: "Run and manage containers",
  },
  {
    id: "eks",
    name: "Elastic Kubernetes Service",
    shortName: "EKS",
    category: "Compute",
    description: "Managed Kubernetes for container applications",
  },
  {
    id: "lightsail",
    name: "Lightsail",
    shortName: "LS",
    category: "Compute",
    description: "Launch and manage virtual private servers",
  },
  {
    id: "s3",
    name: "S3",
    shortName: "S3",
    category: "Storage",
    description: "Scalable storage in the cloud",
  },
  {
    id: "ebs",
    name: "Elastic Block Store",
    shortName: "EBS",
    category: "Storage",
    description: "Block storage for EC2",
  },
  {
    id: "efs",
    name: "Elastic File System",
    shortName: "EFS",
    category: "Storage",
    description: "Fully managed file storage",
  },
  {
    id: "s3-glacier",
    name: "S3 Glacier",
    shortName: "GL",
    category: "Storage",
    description: "Low-cost archive storage",
  },
  {
    id: "rds",
    name: "RDS",
    shortName: "RDS",
    category: "Database",
    description: "Managed relational database service",
  },
  {
    id: "dynamodb",
    name: "DynamoDB",
    shortName: "DDB",
    category: "Database",
    description: "Managed NoSQL database",
  },
  {
    id: "elasticache",
    name: "ElastiCache",
    shortName: "EC",
    category: "Database",
    description: "In-memory caching service",
  },
  {
    id: "redshift",
    name: "Redshift",
    shortName: "RS",
    category: "Database",
    description: "Fast, scalable data warehouse",
  },
  {
    id: "vpc",
    name: "VPC",
    shortName: "VPC",
    category: "Networking & Content Delivery",
    description: "Isolated cloud resources",
  },
  {
    id: "cloudfront",
    name: "CloudFront",
    shortName: "CF",
    category: "Networking & Content Delivery",
    description: "Global content delivery network",
  },
  {
    id: "route53",
    name: "Route 53",
    shortName: "R53",
    category: "Networking & Content Delivery",
    description: "Scalable domain name system",
  },
  {
    id: "api-gateway",
    name: "API Gateway",
    shortName: "AG",
    category: "Networking & Content Delivery",
    description: "Build, deploy, and manage APIs",
  },
  {
    id: "iam",
    name: "IAM",
    shortName: "IAM",
    category: "Security, Identity & Compliance",
    description: "Manage access to AWS resources",
  },
  {
    id: "cognito",
    name: "Cognito",
    shortName: "CG",
    category: "Security, Identity & Compliance",
    description: "User sign-up, sign-in, and access control",
  },
  {
    id: "secrets-manager",
    name: "Secrets Manager",
    shortName: "SM",
    category: "Security, Identity & Compliance",
    description: "Rotate, manage, and retrieve secrets",
  },
  {
    id: "waf",
    name: "WAF & Shield",
    shortName: "WAF",
    category: "Security, Identity & Compliance",
    description: "Protect applications from web exploits",
  },
  {
    id: "cloudwatch",
    name: "CloudWatch",
    shortName: "CW",
    category: "Management & Governance",
    description: "Monitor resources and applications",
  },
  {
    id: "cloudformation",
    name: "CloudFormation",
    shortName: "CFN",
    category: "Management & Governance",
    description: "Model and provision resources as code",
  },
  {
    id: "systems-manager",
    name: "Systems Manager",
    shortName: "SSM",
    category: "Management & Governance",
    description: "Operational hub for AWS applications",
  },
  {
    id: "athena",
    name: "Athena",
    shortName: "AT",
    category: "Analytics",
    description: "Query data in S3 using SQL",
  },
  {
    id: "kinesis",
    name: "Kinesis",
    shortName: "KN",
    category: "Analytics",
    description: "Collect and process real-time data streams",
  },
  {
    id: "sagemaker",
    name: "SageMaker",
    shortName: "SM",
    category: "Machine Learning",
    description: "Build, train, and deploy ML models",
  },
  {
    id: "codebuild",
    name: "CodeBuild",
    shortName: "CB",
    category: "Developer Tools",
    description: "Build and test code",
  },
  {
    id: "codepipeline",
    name: "CodePipeline",
    shortName: "CP",
    category: "Developer Tools",
    description: "Automate release pipelines",
  },
];

const RECENTLY_VISITED_IDS = [
  "ec2",
  "s3",
  "lambda",
  "dynamodb",
  "cloudformation",
];

export function getAllServices(): AwsService[] {
  return SERVICES;
}

export function searchServices(query: string): AwsService[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SERVICES.filter(
    (service) =>
      service.name.toLowerCase().includes(q) ||
      service.shortName.toLowerCase().includes(q) ||
      service.category.toLowerCase().includes(q) ||
      service.description.toLowerCase().includes(q),
  );
}

export function getServicesByCategory(): {
  category: AwsServiceCategory;
  services: AwsService[];
}[] {
  const byCategory = new Map<AwsServiceCategory, AwsService[]>();
  for (const service of SERVICES) {
    const list = byCategory.get(service.category) ?? [];
    list.push(service);
    byCategory.set(service.category, list);
  }
  return Array.from(byCategory.entries()).map(([category, services]) => ({
    category,
    services,
  }));
}

export function getRecentlyVisitedServices(): AwsService[] {
  return RECENTLY_VISITED_IDS.map((id) =>
    SERVICES.find((service) => service.id === id),
  ).filter((service): service is AwsService => Boolean(service));
}
