import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


interface FoodNode {
  name: string;
  icon: string;
  iconColor?: string;
  url?: string;

  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
 
  {
    name: 'ضبط المخازن',
    icon: 'store',
    iconColor: 'warn',
    children: [
      { 
        name: 'بيانات فئات الفواتير',
        icon: 'menu',
        url: '/admin/invoices_types'
      },
      { 
        name: 'بيانات المخازن',
        icon: 'stores',
        url: '/admin/stores'
      },
       { 
        name: 'بيانات الوحدات',
        icon: 'text_format',
        url: '/admin/inv-uoms'

      },
      { 
        name: 'فئات الأصناف',
        icon: 'store',
        url: '/admin/invItemsCategories'

      },
      { 
        name: 'الأصناف',
        icon: 'dashboard',
        url: '/admin/invItems'

      },
    ],
  },
  {
    name: 'الحسابات',
    icon: 'monetization_on',
    iconColor: 'success',
    children: [
      { 
        name: 'أنواع الحسابات المالية',
        icon: 'menu',
        url: '/admin/accountTypes'
      },
      { 
        name: 'الشجرة (الحسابات المالية)',
        icon: 'stores',
        url: '/admin/accounts'
      },
       { 
        name: 'حسابات العملاء',
        icon: 'text_format',
        url: '/admin/customers'

      },
      { 
        name: 'حسابات المناديب',
        icon: 'store',
        url: '/admin/invItemsCategories'

      },
      { 
        name: 'فئات الموردين',
        icon: 'dashboard',
        url: '/admin/suppliersCategories'

      },
      { 
        name: 'حسابات الموردين',
        icon: 'dashboard',
        url: '/admin/suppliers'

      },
      { 
        name: 'شاشة تحيل النقدية',
        icon: 'dashboard',
        url: '/admin/invItems'

      },
      { 
        name: 'شاشة صرف النقدية',
        icon: 'dashboard',
        url: '/admin/invItems'

      },
    ],
  },
  {
    name: 'المشتريات و المخازن',
    icon: 'menu',
    iconColor: 'danger',
    children: [
      { 
        name: 'فواتير المشتريات',
        icon: 'menu',
        url: '/admin/suppliersOrders'
      },
      { 
        name: 'فواتير مرتجع المشتريات العام',
        icon: 'stores',
        url: '/admin/accounts'
      },
       { 
        name: 'جرد المخازن',
        icon: 'text_format',
        url: '/admin/inv-uoms'

      },
       { 
        name: 'ارصدة الأصناف',
        icon: 'text_format',
        url: '/admin/inv-uoms'

      }
    ],
  },
  {
    name: 'المبيعات',
    icon: 'shopping_cart',
    iconColor: 'success',
    children: [
      { 
        name: 'أنواع الحسابات المالية',
        icon: 'menu',
        url: '/admin/accountTypes'
      },
      { 
        name: 'الشجرة (الحسابات المالية)',
        icon: 'stores',
        url: '/admin/accounts'
      },
       { 
        name: 'حسابات العملاء',
        icon: 'text_format',
        url: '/admin/inv-uoms'

      }
    ],
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  icon: string;
  iconColor: string;
  url: string;
  level: number;
}

/**
 * @title Tree with flat nodes
 */

@Component({
  selector: 'admin-side-nav-list',
  templateUrl: './admin-side-nav-list.component.html',
  styleUrls: ['./admin-side-nav-list.component.scss']
})
export class AdminSideNavListComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon: node.icon,
      iconColor: node.iconColor,
      url: node.url,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
