export const DEMO_ADMIN_EMAIL = 'admin@agrsoft.com'
export const DEMO_ADMIN_PASSWORD = 'Admin@123'

export const isAdminUser = (user) => user?.role === 'Admin'
  && user.email?.toLowerCase() === DEMO_ADMIN_EMAIL
  && user.demoAdminSession === 'demo-admin-v1'

export const mockCustomers = [
  { name: 'AGRSoft Customer', email: 'customer@agrsoft.com', company: 'Contoso India Pvt. Ltd.', phone: '+91 98765 43210' },
  { name: 'Olivia Martin', email: 'olivia@northwind.com', company: 'Northwind Traders', phone: '+91 98220 11223' },
  { name: 'Daniel Wilson', email: 'daniel@fabrikam.com', company: 'Fabrikam Services', phone: '+91 98100 44556' },
]
