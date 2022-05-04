from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.request import HttpRequest
import hashlib

from authApp.models import User,Pointage,Employee,Department,Pointage_register,Active_connection,Connection_register
from authApp.serializers import User_serializer,Pointage_serializer,Employee_serializer,Department_serializer,Pointage_register_serializer,Active_connection_serializer,Connection_register_serializer

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
        employee= Employee.objects.get(employee_id = employee_data['employee_id'] )
        employee_serializer = Employee_serializer(employee,data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Update successfully",safe=False)
        return JsonResponse("failded to Update", safe= False)
    elif request.method == 'DELETE':
        employee=Employee.objects.get(employee_id =id)
        employee.delete()
        return JsonResponse("Delete successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def pointage_API(request: HttpRequest, id = 0):
    if request.method == 'GET':
        pointage = Pointage.objects.all()
        pointage_serializer = Pointage_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
        employee = Employee.objects.get(pk=pointage_data["numero_matricule"])
        pointage_data["employee_name"] = employee.employee_name
        pointage_data["employee_dep_name"] = employee.department_name         
        pointage_serializer = Pointage_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)    
    #filtrer les pointages par département
    elif request.method == 'DELETE':
        dep = Department.objects.get(pk=id)
        pointage=Pointage.objects.filter(employee_dep_name = dep.department_name)
        pointage_serializer = Pointage_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def pointage_register_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        pointage = Pointage_register.objects.all()
        pointage_serializer = Pointage_register_serializer(pointage, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
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
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
        employee = Employee.objects.get(pk=pointage_data["numero_matricule"])
        pointage_data["employee_name"] = employee.employee_name
        pointage_serializer = Pointage_serializer(data=pointage_data)
        pointage_serializer = Active_connection_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'DELETE':
        pointage=Active_connection.objects.get(numero_matricule =id)
        pointage.delete()
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
    return JsonResponse("Failded to delete", safe = False)

