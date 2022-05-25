from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.request import HttpRequest

from VisitApp.models import Visits_actif,Visits_register,Lieu, Visitors
from VisitApp.serializers import Visit_serializer, Visits_register_serializer,Lieu_serializers, Visitor_serializer


# Create your views here.
@csrf_exempt
def visitor_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        visits_actif = Visitors.objects.all()
        visits_actif_serializer = Visitor_serializer(visits_actif, many=True)
        return JsonResponse(visits_actif_serializer.data, safe=False)
    elif request.method== 'POST':
        visitor_data = JSONParser().parse(request)
        visitor_serializer = Visitor_serializer(data=visitor_data)
        if visitor_serializer.is_valid():
            visitor_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        visit_data = JSONParser().parse(request)
        visit= Visits_actif.objects.get(visit_id = visit_data['visit_id'] )
        visit_serializer = Visit_serializer(visit,data=visit_data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            return JsonResponse("Update successfully",safe=False)
        return JsonResponse("failded to Update", safe= False)
    elif request.method == 'DELETE':
        visit=Visits_actif.objects.get(CIN =id)
        visit.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def visit_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        visits_actif = Visits_actif.objects.all()
        visits_actif_serializer = Visit_serializer(visits_actif, many=True)
        return JsonResponse(visits_actif_serializer.data, safe=False)
    elif request.method== 'POST':
        visit_data = JSONParser().parse(request)
        visit_serializer = Visit_serializer(data=visit_data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        visit_data = JSONParser().parse(request)
        visit= Visits_actif.objects.get(visit_id = visit_data['visit_id'] )
        visit_serializer = Visit_serializer(visit,data=visit_data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            return JsonResponse("Update successfully",safe=False)
        return JsonResponse("failded to Update", safe= False)
    elif request.method == 'DELETE':
        visit=Visits_actif.objects.get(CIN =id)
        visit.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def visit_register_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        visits_register = Visits_register.objects.all()
        visits_register_serializer = Visits_register_serializer(visits_register, many=True)
        return JsonResponse(visits_register_serializer.data, safe=False)
    elif request.method== 'POST':
        visit_data = JSONParser().parse(request)
        visit_serializer = Visits_register_serializer(data=visit_data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            return JsonResponse("Added successfully to visit register",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'DELETE':
        visits_register=Visits_register.objects.get(visit_id =id)
        visits_register.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def visit_counter_API(request: HttpRequest, id=0):
    #nb de visit pour tout les lieu dans un tableau
    if request.method == 'GET':
        ''' Visits_actif = Visits_actif.objects.all()
        nb_visit = Visits_actif.count() '''
        visit_tab = []
        for i in range(1,4):
            lieu = Lieu.objects.get(pk = i)
            visits_actif = Visits_actif.objects.filter(lieu = lieu.lieu_name)
            nb_visit = visits_actif.count()
            visit_tab.append(nb_visit)
        
        return JsonResponse(visit_tab, safe=False)
    #nombre de visit pour un lieu en particulier
    elif request.method == 'DELETE':
        lieu = Lieu.objects.get(pk = id)
        visits_actif = Visits_actif.objects.filter(lieu = lieu.lieu_name)
        nb_visit = Visits_actif.count()
        return JsonResponse(nb_visit, safe = False)
    return JsonResponse("wrong lieu_id", safe = False)

@csrf_exempt
def lieu_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        lieux = Lieu.objects.all()
        Visits_actif_serializer = Lieu_serializers(lieux, many=True)
        return JsonResponse(Visits_actif_serializer.data, safe=False)    
    elif request.method== 'POST':
        visit_data = JSONParser().parse(request)
        visit_serializer = Lieu_serializers(data=visit_data)
        if visit_serializer.is_valid():
            visit_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        lieu_data = JSONParser().parse(request)
        lieu= Lieu.objects.get(pk = lieu_data['lieu_id'])
        lieu.isActive = lieu_data['isActive']
        lieu.save()
        return JsonResponse("Update successfully",safe=False)
    #un lieu en particulier
    elif request.method == 'DELETE':
        lieu = Lieu.objects.get(pk = id)
        lieu_serializer = Lieu_serializers(lieu)
        return JsonResponse(lieu_serializer.data, safe=False) 
    return JsonResponse("wrong lieu_id", safe = False)
