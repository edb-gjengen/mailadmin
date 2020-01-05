# Installation
```shell script
apt-get install libldap2-dev python-dev libsasl2-dev libssl-dev ldap-utils libffi-dev
python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
# Create or modify local_settings.py
python manage.py migrate
```
## LDAP
```shell script
docker pull osixia/openldap
docker run -e LDAP_DOMAIN=neuf.no -e LDAP_ORGANISATION="Neuf" -e LDAP_ROOTPASS="toor" -p 389:389 -d osixia/openldap
ldapadd -D "cn=admin,dc=neuf,dc=no" -w "toor" -f testdata.ldif
# Verify import
ldapsearch -x -b dc=neuf,dc=no
```
## Django postfix dovecot
* Get the code from https://git.neuf.no/edb/django-postfix-dovecot-api and follow the README
* Setup a user with `python manage.py createsuperuser` in that project
* Update the env variables `DPD_API_USERNAME` and `DPD_API_PASSWORD` in this project
* Start the server on port 8080 `python manage.py runserver 8080`
    
# Development tasks
```shell script
python manage.py runserver
python manage.py createsuperuser
```
# Deployment
```shell script
fab deploy
```