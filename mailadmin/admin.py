from django.contrib import admin

from mailadmin.models import OrgUnit


class OrgUnitAdmin(admin.ModelAdmin):
    list_display = ('name', 'prefix', 'is_active')
    list_filter = ('is_active',)
    list_editable = ('prefix',)
    filter_horizontal = ('admin_groups', 'member_groups')

admin.site.register(OrgUnit, OrgUnitAdmin)