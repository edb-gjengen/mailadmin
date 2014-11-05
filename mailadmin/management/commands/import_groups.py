from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Group

import requests

from mailadmin.models import OrgUnit


class Command(BaseCommand):
    help = 'Adds groups and OrgUnits from inside.studentersamfundet.no.'

    def handle(self, *args, **options):
        r = requests.get('https://inside.studentersamfundet.no/api/groups.php')
        res = r.json()
        if 'results' not in res:
            self.stderr.write('Error: No groups, bailing...')

        groups = res['results']
        for g in groups:
            if g['posix_group'] != "":
                obj, created = Group.objects.get_or_create(name=g['posix_group'])
                ou_obj, ou_created = OrgUnit.objects.get_or_create(name=g['division_name'], inside_id=g['division_id'])
                if 'styret' in g['posix_group']:
                    ou_obj.admin_groups.add(obj)
                else:
                    ou_obj.member_groups.add(obj)

        self.stdout.write('Done.')
