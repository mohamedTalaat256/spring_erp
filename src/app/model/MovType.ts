export interface MovType {
    id: number;
    name: string;
    active: number;
    in_screen: number;
    is_private_internal: number;
}

export const movTypes: MovType[] = [
    { id: 1, name: 'مراجعة واستلام نقدية شفت علي نفس الخزنة', active: 1, in_screen: 2, is_private_internal: 1 },
    { id: 2, name: 'مراجعة واستلام نقدية شفت خزنة اخري', active: 1, in_screen: 2, is_private_internal: 1 },
    { id: 3, name: 'صرف مبلغ لحساب مالي', active: 1, in_screen: 1, is_private_internal: 0 },
    { id: 4, name: 'تحصيل مبلغ من حساب مالي', active: 1, in_screen: 2, is_private_internal: 0 },
    { id: 5, name: 'تحصيل ايراد مبيعات', active: 1, in_screen: 2, is_private_internal: 0 },
    { id: 6, name: 'صرف نظير مرتجع مبيعات', active: 1, in_screen: 1, is_private_internal: 0 },
    { id: 8, name: 'صرف سلفة علي راتب موظف', active: 1, in_screen: 1, is_private_internal: 1 },
    { id: 9, name: 'صرف نظير مشتريات من مورد', active: 1, in_screen: 1, is_private_internal: 0 },
    { id: 10, name: 'تحصيل نظير مرتجع مشتريات الي مورد', active: 1, in_screen: 2, is_private_internal: 0 },
    { id: 16, name: 'ايراد زيادة راس المال', active: 1, in_screen: 2, is_private_internal: 0 },
    { id: 17, name: 'مصاريف شراء مثل النولون', active: 1, in_screen: 1, is_private_internal: 0 },
    { id: 18, name: 'صرف للإيداع البنكي', active: 1, in_screen: 1, is_private_internal: 0 },
    { id: 21, name: 'رد سلفة علي راتب موظف', active: 1, in_screen: 2, is_private_internal: 1 },
    { id: 22, name: 'تحصيل خصومات موظفين', active: 1, in_screen: 2, is_private_internal: 1 },
    { id: 24, name: 'صرف مرتب لموظف', active: 1, in_screen: 1, is_private_internal: 1 },
    { id: 25, name: 'سحب من البنك', active: 1, in_screen: 2, is_private_internal: 0 },
    { id: 26, name: 'صرف لرد رأس المال', active: 1, in_screen: 1, is_private_internal: 0 },
    { id: 27, name: 'صرف بفاتورة خدمات مقدمة لنا', active: 1, in_screen: 1, is_private_internal: 0 },
    { id: 28, name: 'تحصيل بفاتورة خدمات نقدمها للغير', active: 1, in_screen: 2, is_private_internal: 0 }
];