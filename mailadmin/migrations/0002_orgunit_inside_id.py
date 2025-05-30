from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("mailadmin", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="orgunit",
            name="inside_id",
            field=models.IntegerField(null=True, blank=True),
            preserve_default=True,
        ),
    ]
