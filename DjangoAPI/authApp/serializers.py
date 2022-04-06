from rest_framework import serializers
from authApp.models import User

class User_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id',
                  'user_first_name',
                  'user_last_name',
                  'numero_matricule',
                  'password'
                  )