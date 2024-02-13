import setuptools

with open('VERSION.txt', 'r') as f:
    version = f.read().strip()

setuptools.setup(
    name="odoo14-addons-open-synergy-opnsynid-hr-career-management",
    description="Meta package for open-synergy-opnsynid-hr-career-management Odoo addons",
    version=version,
    install_requires=[
        'odoo14-addon-ssi_hr_award',
        'odoo14-addon-ssi_hr_award_work_log',
        'odoo14-addon-ssi_hr_career_transition',
        'odoo14-addon-ssi_hr_career_transition_work_log',
        'odoo14-addon-ssi_hr_dicipline',
        'odoo14-addon-ssi_hr_dicipline_work_log',
    ],
    classifiers=[
        'Programming Language :: Python',
        'Framework :: Odoo',
        'Framework :: Odoo :: 14.0',
    ]
)
