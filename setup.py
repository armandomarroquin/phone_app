from setuptools import setup, find_packages

setup(
    name='phone_app',
    version='0.0.1',
    description='Phone Application',
    author='Tu Nombre',
    author_email='tuemail@dominio.com',
    packages=find_packages(),
    zip_safe=False,
    include_package_data=True,
    install_requires=('frappe',),
)
