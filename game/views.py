from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.



def index(request):
    line1 = '<h1 style="text-align: center">术士之战</h1>'
    line4 = '<a href="play/">进入游戏界面</a>'
    line2 = '<hr>'
    line3 = '<image src="https://img1.baidu.com/it/u=3313682859,2079707202&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" width=100%/>'
    return HttpResponse(line1+line4+line2+line3)


def play(request):
    line4 = '<h1 style="text-align: center">术士之战</h1>'
    line1 = '<h1 style="text-align: center">游戏界面</h1>'
    line3 = '<a href="/game">返回主页面</a>'
    line2 = '<image src="https://img1.baidu.com/it/u=3313682859,2079707202&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" width=100%/>'
    return HttpResponse(line4+line1 + line3+line2)