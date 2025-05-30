from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("mailadmin", "0004_auto_20150125_1401"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="prefix",
            options={"verbose_name_plural": "prefixes"},
        ),
    ]
