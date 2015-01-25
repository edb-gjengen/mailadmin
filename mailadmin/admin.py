from django.contrib import admin

from mailadmin.models import OrgUnit, Prefix


class PrefixInline(admin.TabularInline):
    model = Prefix
    extra = 0


class OrgUnitAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    list_filter = ('is_active',)
    filter_horizontal = ('admin_groups', 'member_groups')
    inlines = [PrefixInline]

admin.site.register(OrgUnit, OrgUnitAdmin)
admin.site.register(Prefix)