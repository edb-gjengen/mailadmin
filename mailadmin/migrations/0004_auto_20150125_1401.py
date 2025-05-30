import django.db.models.deletion
from django.db import migrations, models


def normalize_prefixes(apps, schema_editor):  # noqa: ARG001
    Prefix = apps.get_model("mailadmin", "Prefix")
    OrgUnit = apps.get_model("mailadmin", "OrgUnit")

    for ou in OrgUnit.objects.all():
        if ou.prefix:
            Prefix.objects.create(name=ou.prefix, orgunit=ou)


def noop(*args, **kwargs):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("mailadmin", "0003_auto_20141105_2153"),
    ]

    operations = [
        migrations.CreateModel(
            name="Prefix",
            fields=[
                (
                    "id",
                    models.AutoField(
                        verbose_name="ID",
                        serialize=False,
                        auto_created=True,
                        primary_key=True,
                    ),
                ),
                ("name", models.CharField(max_length=500, null=True, blank=True)),
                (
                    "orgunit",
                    models.ForeignKey(
                        related_name="prefixes",
                        to="mailadmin.OrgUnit",
                        on_delete=django.db.models.deletion.CASCADE,
                    ),
                ),
            ],
            options={},
            bases=(models.Model,),
        ),
        migrations.RunPython(normalize_prefixes, noop),
        migrations.RemoveField(
            model_name="orgunit",
            name="prefix",
        ),
    ]
