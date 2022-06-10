import django
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.http.request import HttpRequest

from authApp.models import User,Pointage,Employee,Department,Pointage_register, Stagiaire, Vehicule
from authApp.serializers import User_serializer,Pointage_serializer,Employee_serializer,Department_serializer,Pointage_register_serializer,Stagiaire_serializer, Vehicule_serializer
from VisitApp.models import Lieu

from django.core.files.storage import default_storage

# Create your views here.
@csrf_exempt
def user_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        user = User.objects.all()
        user_serializer = User_serializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)
    elif request.method== 'POST':
        user = Pointage.objects.filter(function = "AGENT DE SECURITE")
        user_serializer = Pointage_serializer(user, many=True)
        return JsonResponse(user_serializer.data, safe=False)
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
        employee_serializer = Employee_serializer(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee=Employee.objects.get(pk=employee_data['numero_matricule'])
        employee_serializer=Employee_serializer(employee,data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method == 'DELETE':
        employee=Employee.objects.get(pk = id)
        employee.delete()
        return JsonResponse("deleted successfully", safe = False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def stagiaire_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        stagiaire = Stagiaire.objects.all()
        stagiaire_serializer = Stagiaire_serializer(stagiaire, many=True)
        return JsonResponse(stagiaire_serializer.data, safe=False)
    elif request.method== 'POST':
        stagiaire_data = JSONParser().parse(request)
        stagiaire_serializer = Stagiaire_serializer(data=stagiaire_data)
        if stagiaire_serializer.is_valid():
            stagiaire_serializer.save() 
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method=='PUT':
        stagiaire_data = JSONParser().parse(request)
        stagiaire=Stagiaire.objects.get(pk=stagiaire_data['stagiaire_id'])
        stagiaire_serializer=Stagiaire_serializer(stagiaire,data=stagiaire_data)
        if stagiaire_serializer.is_valid():
            stagiaire_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method == 'DELETE':
        stagiaire=Stagiaire.objects.get(pk = id)
        stagiaire.delete()
        return JsonResponse("deleted successfully", safe = False) 
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def vehicule_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        vehicule = Vehicule.objects.all()
        vehicule_serializer = Vehicule_serializer(vehicule, many=True)
        return JsonResponse(vehicule_serializer.data, safe=False)
    elif request.method== 'POST':
        vehicule_data = JSONParser().parse(request)
        vehicule_serializer = Vehicule_serializer(data=vehicule_data)
        if vehicule_serializer.is_valid():
            vehicule_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)
    elif request.method == 'PUT':
        vehicule_data = JSONParser().parse(request)
        vehicule=Vehicule.objects.get(pk=vehicule_data['vehicule_id'])
        vehicule_serializer=Vehicule_serializer(vehicule,data=vehicule_data)
        if vehicule_serializer.is_valid():
            vehicule_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)
    elif request.method == 'DELETE':
        vehicule=Vehicule.objects.get(pk = id)
        vehicule.delete()
        return JsonResponse("deleted successfully", safe = False)
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
        pointage_data["function"] = employee.function    
        pointage_serializer = Pointage_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)    
    #pointage des stagiaires
    elif request.method== 'PUT':
        pointage_data = JSONParser().parse(request)
        stagiaire = Stagiaire.objects.get(stagiaire_name=pointage_data["stagiaire_name"])
        pointage_data["employee_name"] = stagiaire.stagiaire_name
        pointage_data["employee_dep_name"] = stagiaire.department_name     
        pointage_data["function"] = "stagiaire"  
        pointage_data["start_date"] = stagiaire.start_date
        pointage_data["end_date"] = stagiaire.end_date 
        pointage_serializer = Pointage_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Pointage stagiaire added successfully",safe=False)
        return JsonResponse("Pointage stagiaire failded to add", safe= False)

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
    elif request.method == 'PUT':
        #Delete pointage actif ito
        pointage_data = JSONParser().parse(request)
        pointage=Pointage.objects.get(employee_name =pointage_data["employee_name"])
        pointage.delete()
        return JsonResponse("Delete successfully", safe = False)
    elif request.method == 'DELETE':
        pointage=Pointage_register.objects.get(pointage_id =id)
        pointage.delete()
        return JsonResponse("Delete successfully", safe=False)
    return JsonResponse("Failded to delete", safe = False)

@csrf_exempt
def security_API(request: HttpRequest, id=0):
    if request.method == 'GET':
        employee = Employee.objects.filter(department=3)
        employee_serializer = Employee_serializer(employee, many=True)
        return JsonResponse(employee_serializer.data, safe=False)
    #liste de sécurité actif à un lieu 
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        pointage_tab = Pointage.objects.filter(lieu = request_data["lieu"], function = "AGENT DE SECURITE")      
        pointage_serializer = Pointage_serializer(pointage_tab, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
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
    #prendre le nombre de pointage à un lieu sur les 7 dérnières dates
    elif request.method== 'POST':
        tab = []
        request_data = JSONParser().parse(request)
        for i in range(7):      
            pointage = Pointage_register.objects.filter(date = request_data["date" + str(i)], lieu = request_data["lieu"])
            tab.append(pointage.count())
        return JsonResponse(tab,safe=False)
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
        pointage_tab = Pointage_register.objects.filter(employee_name = request_data["employee_name"], date = request_data["date"])      
        pointage_serializer = Pointage_register_serializer(pointage_tab, many=True)
        return JsonResponse(pointage_serializer.data, safe=False)
    return JsonResponse("wrong ", safe = False)

@csrf_exempt
def SaveFile(request):
    file = request.FILES["uploadedFile"]
    file_name = default_storage.save(file.name , file)
    
    return JsonResponse(file_name,safe=False)



@csrf_exempt
def pointageStg(request):
    if request.method== 'GET':
        pointages = Pointage_register.objects.filter(function="stagiaire") 
        pointage_serializer = Pointage_register_serializer(pointages, many=True)
        return JsonResponse(pointage_serializer.data, safe=False) 
    #Pour le pointed_at
    elif request.method== 'PUT':
        stagiaire_data = JSONParser().parse(request)
        stagiaire= Stagiaire.objects.get(stagiaire_name = stagiaire_data['stagiaire_name'] )
        stagiaire.pointed_at = stagiaire_data["pointed_at"]
        stagiaire.isActif = stagiaire_data["isActif"]
        stagiaire.save()
        return JsonResponse("Update successfully",safe=False)

@csrf_exempt
def pointageEmp(request):
    #Pour le pointed_at
    employee_data = JSONParser().parse(request)
    employee= Employee.objects.get(numero_matricule = employee_data['numero_matricule'] )
    employee.pointed_at = employee_data["pointed_at"]
    employee.save()
    return JsonResponse("Update successfully",safe=False)

@csrf_exempt
def pointageVehicule(request):
    if request.method== 'GET':
        pointages = Pointage_register.objects.filter(function="vehicule") 
        pointage_serializer = Pointage_register_serializer(pointages, many=True)
        return JsonResponse(pointage_serializer.data, safe=False) 
    elif request.method== 'POST':
        pointage_data = JSONParser().parse(request)
        vehicule = Vehicule.objects.get(numero_matricule=pointage_data["numero_matricule"])
        pointage_data["employee_name"] = vehicule.numero_matricule
        pointage_data["employee_dep_name"] = vehicule.department_name         
        pointage_data["function"] = "vehicule"   
        pointage_serializer = Pointage_serializer(data=pointage_data)
        if pointage_serializer.is_valid():
            pointage_serializer.save()
            return JsonResponse("Pointage vehicule added successfully",safe=False)
        return JsonResponse("failded to add", safe= False)    
    #changer le pointed_at vehicule
    elif request.method== 'PUT':
        vehicule_data = JSONParser().parse(request)
        vehicule= Vehicule.objects.get(numero_matricule = vehicule_data['numero_matricule'] )
        vehicule.pointed_at = vehicule_data["pointed_at"]
        vehicule.save()
        return JsonResponse("Updated successfully",safe=False)
        
    return JsonResponse("Pointage vehicule failded to add", safe= False)
    
