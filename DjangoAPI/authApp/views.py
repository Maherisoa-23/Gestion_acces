from asyncio.windows_events import NULL
import re
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.request import HttpRequest
import hashlib

from authApp.models import User,Pointage,Employee,Department,Pointage_register,Active_connection,Connection_register
from authApp.serializers import User_serializer,Pointage_serializer,Employee_serializer,Department_serializer,Pointage_register_serializer,Active_connection_serializer,Connection_register_serializer
from VisitApp.models import Lieu

# Create your views here.
@csrf_exempt
def user_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        user = User.objects.all()
        user_serializer = User_serializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)
    elif request.method== 'POST':
        user_data = JSONParser().parse(request)
        user_data["password"] = hashlib.md5(user_data["password"].encode()).hexdigest()
        user_serializer = User_serializer(data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user= User.objects.get(user_id = user_data['user_id'] )
        user_serializer = User_serializer(user,data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Update successfully",safe=False)
        return JsonResponse("failded to Update", safe= False)
    elif request.method == 'DELETE':
        user=User.objects.get(user_id =id)
        user.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def department_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        pointage = Department.objects.all()
        pointage_serializer = Department_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
        pointage_serializer = Department_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'DELETE':
        pointage=Department.objects.get(pointage_id =id)
        pointage.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def employee_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        employee = Employee.objects.all()
        employee_serializer = Employee_serializer(employee, many=True)
        return JsonResponse(employee_serializer.data, safe=False)
    elif request.method== 'POST':
        employee_data = JSONParser().parse(request)
        department = Department.objects.get(pk=employee_data["department"])
        employee_data["department_name"] = department.department_name
        employee_data["password"] = hashlib.md5(employee_data["password"].encode()).hexdigest()
        employee_serializer = Employee_serializer(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee= Employee.objects.get(numero_matricule = employee_data['numero_matricule'] )
        employee.pointed_at = employee_data["pointed_at"]
        employee.save()
        return JsonResponse("Update successfully",safe=False)
        #return JsonResponse("failded to Update", safe= False)
    elif request.method == 'DELETE':
        employee=Employee.objects.filter(department =id)
        employee_serializer = Employee_serializer(employee, many=True)
        return JsonResponse(employee_serializer.data, safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def pointage_API(request: HttpRequest, id = 0):
    if request.method == 'GET':
        pointage = Pointage.objects.all()
        pointage_serializer = Pointage_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
        employee = Employee.objects.get(numero_matricule=pointage_data["numero_matricule"])
        pointage_data["employee_name"] = employee.employee_name
        pointage_data["employee_dep_name"] = employee.department_name         
        pointage_serializer = Pointage_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)    
    elif request.method == 'DELETE':
        pointage=Pointage.objects.get(numero_matricule =id)
        pointage.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def pointage_register_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        pointage = Pointage_register.objects.all()
        pointage_serializer = Pointage_register_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
        employee = Employee.objects.get(pk=pointage_data["numero_matricule"])
        pointage_data["employee_name"] = employee.employee_name
        pointage_data["employee_dep_name"] = employee.department_name 
        pointage_serializer = Pointage_register_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'DELETE':
        pointage=Pointage_register.objects.get(pointage_id =id)
        pointage.delete()
        return JsonResponse("Delete successfully", safe=False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def active_connection_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        pointage = Active_connection.objects.all()
        pointage_serializer = Active_connection_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    elif request.method == 'PUT':
        AC_data = JSONParser().parse(request)
        active = Active_connection.objects.get(lieu = AC_data["lieu"])
        active.date = AC_data["date"]
        emp = Employee.objects.get(pk = AC_data["numero_matricule"])
        active.employee_name = emp.employee_name
        active.numero_matricule = emp
        active.entry_time = AC_data["entry_time"]
        active.save()
        return JsonResponse("Updated successfully", safe= False)
    elif request.method == 'DELETE':
        pointage=Active_connection.objects.get(pk =id)
        pointage.employee_name = ""
        pointage.entry_time = ""
        pointage.numero_matricule = None
        pointage.save()
        return JsonResponse("Delete successfully", safe=False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def connection_register_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        pointage = Connection_register.objects.all()
        pointage_serializer = Connection_register_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
        employee = Employee.objects.get(pk=pointage_data["numero_matricule"])
        pointage_data["employee_name"] = employee.employee_name
        pointage_serializer = Connection_register_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'DELETE':
        pointage=Connection_register.objects.get(pointage_id =id)
        pointage.delete()
        return JsonResponse("Delete successfully", safe=False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def security_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        employee = Employee.objects.filter(department=3)
        employee_serializer = Employee_serializer(employee, many=True)
        return JsonResponse(employee_serializer.data, safe=False)
    #filtrer les pointages par département
    elif request.method == 'DELETE':
        dep = Department.objects.get(pk=id)
        pointage=Pointage.objects.filter(employee_dep_name = dep.department_name)
        pointage_serializer = Pointage_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def pointage_counter_API(request: HttpRequest, id=0):
    
    #nb de pointage pour tout les lieu dans un tableau
    if request.method == 'GET':
        pointage_tab = []
        for i in range(1,4):
            lieu = Lieu.objects.get(pk = i)
            pointage = Pointage.objects.filter(lieu = lieu.lieu_name)
            nb_pointage = pointage.count()
            pointage_tab.append(nb_pointage)
        
        return JsonResponse(pointage_tab, safe=False)
    #prendre le nombre de pointage à un lieu et date précis
    elif request.method== 'POST':
        request_data = JSONParser().parse(request)
        pointage = Pointage_register.objects.filter(date = request_data["date"], lieu = request_data["lieu"])
        return JsonResponse(pointage.count(),safe=False)
    #nombre de pointage pour un lieu en particulier
    elif request.method == 'DELETE':
        lieu = Lieu.objects.get(pk = id)
        pointage = Pointage.objects.filter(lieu = lieu.lieu_name)
        nb_pointage = pointage.count()
        return JsonResponse(nb_pointage, safe = False)
    return JsonResponse("wrong lieu_id", safe = False)

@csrf_exempt
def daily_pointage_API(request: HttpRequest, id=0):
    
    #pointage d'un employée que est passé par plusieurs locaux en une journée
    if request.method == 'POST':
        request_data = JSONParser().parse(request)
        pointage_tab = Pointage_register.objects.filter(numero_matricule = request_data["numero_matricule"], date = request_data["date"])      
        pointage_serializer = Pointage_register_serializer(pointage_tab, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    return JsonResponse("wrong ", safe = False)

