from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import XUser
from rest_framework.authtoken.models import Token



@receiver(post_save, sender=XUser)
def user_create(sender, instance, created, *args, **kwargs):
	if created:
		try:
			Token.objects.get_or_create(user=instance)
		except Exception as e:
			pass