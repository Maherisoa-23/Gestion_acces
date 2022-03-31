from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.request import HttpRequest

from VisitApp.models import Visits
from VisitApp.serializers import Visit_serializer


# Create your views here.
@csrf_exempt
def visit_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        visits = Visits.objects.all()
        visits_serializer = Visit_serializer(visits, many=True)
        return JsonResponse(visits_serializer.data, safe=False)
    elif request.method== 'POST':
        visit_data = JSONParser().parse(request)
        visit_serializer = Visit_serializer(data=visit_data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        visit_data = JSONParser().parse(request)
        visit= Visits.objects.get(visit_id = visit_data['visit_id'] )
        visit_serializer = Visit_serializer(visit,data=visit_data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            return JsonResponse("Update successfully",safe=False)
        return JsonResponse("failded to Update", safe= False)
    elif request.method == 'DELETE':
        visit=Visits.objects.get(visit_id =id)
        visit.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)