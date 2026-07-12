{
    'name': 'AssetFlow - Enterprise Asset Management',
    'version': '18.0.1.0.0',
    'summary': 'Simplify and digitize tracking, allocation, and maintenance of physical assets.',
    'description': """
        AssetFlow
        =========
        Enterprise Asset & Resource Management System.
        Provides functionality for:
        - Departments, asset categories, and employee directory integration
        - Asset lifecycle tracking
        - Asset allocations and transfers
        - Shared resource bookings
        - Maintenance requests and workflows
        - Asset audits
    """,
    'category': 'Human Resources/Asset Management',
    'author': 'Your Name',
    'website': 'https://hackathon.odoo.com',
    'license': 'LGPL-3',
    'depends': ['base', 'hr', 'mail'],
    'data': [
        'security/asset_flow_security.xml',
        'security/ir.model.access.csv',
        'views/menus.xml',
        'views/category_views.xml',
    ],
    'demo': [],
    'installable': True,
    'application': True,
    'auto_install': False,
}
