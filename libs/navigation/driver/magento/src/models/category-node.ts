export interface CategoryNode {
  __typename?: string;
  id: number;
  name?: string;
  include_in_menu: boolean;
  product_count: number;
  level?: number;
  children_count?: number;
	children?: CategoryNode[];
	position?: number;
	breadcrumbs?: MagentoBreadcrumb[];
}

export interface MagentoBreadcrumb {
  category_id: number;
  category_name: string;
  category_level: number;
  category_url_key: string;
}
