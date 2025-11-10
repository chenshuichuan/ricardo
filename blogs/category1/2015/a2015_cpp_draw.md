---
title: C++实现控制台下字符画直线和画圆
date: 2015/12/10
tags:
 - Cpp
categories:
 - 学习
 - 算法

---
## 原理
### DDA画直线法：
![draw](/old/a2015_cpp_draw1.png "draw")
![draw](/old/a2015_cpp_draw2.png "draw")

ε=1/max(|△x|,|△y|)

![draw](/old/a2015_cpp_draw3.png "draw")
![draw](/old/a2015_cpp_draw4.png "draw")
![draw](/old/a2015_cpp_draw5.png "draw")




### 中点BH画圆法
![draw](/old/a2015_cpp_draw6.png "draw")

### 八分法
![draw](/old/a2015_cpp_draw7.png "draw")
首先解决八分之一圆弧

![draw](/old/a2015_cpp_draw8.png "draw")
![draw](/old/a2015_cpp_draw9.png "draw")
![draw](/old/a2015_cpp_draw10.png "draw")
![draw](/old/a2015_cpp_draw11.png "draw")
![draw](/old/a2015_cpp_draw12.png "draw")
![draw](/old/a2015_cpp_draw13.png "draw")
![draw](/old/a2015_cpp_draw14.png "draw")

## 算法步骤：
1. 输入圆的半径R。
2. 计算初始值d=1.25-R、x=0、y=R。
3. 绘制点(x,y)及其在八分圆中的另外七个对称点。
4. 判断d的符号。若d≤0，则先将d更新为d+2x+3，再将(x,y)更新为(x+1,y)；否则先将d更新为d+2(x-y)+5，再将(x,y)更新为(x+1,y-1)。
5. 当x<y时，重复步骤3和4。否则结束。

## 改进：用d-0.25代替d
算法步骤：
1. 输入圆的半径R。
2. 计算初始值d=1-R、x=0、y=R。
3. 绘制点(x,y)及其在八分圆中的另外七个对称点。
4. 判断d的符号。若d≤0，则先将d更新为d+2x+3，再将(x,y)更新为(x+1,y)；否则先将d更新为d+2(x-y)+5，再将(x,y)更新为(x+1,y-1)。
5. 当x<y时，重复步骤3和4。否则结束。

![draw](/old/a2015_cpp_draw15.png "draw")

## 代码
### DDA画直线：
```cpp
#include<iostream>
#include<cmath>
using namespace std;
int arr[100][100];

void drawLine(int x0, int y0, int x1, int y1)
{
	int ymax = y1;
	int ymin = y0;
	if (y0 > y1){
		ymax = y0;
		ymin = y1;
	}
	int xmax = x0;
	if (x1 > x0)xmax = x1;
	for (int j = ymin; j < ymax; j++)
	{
		for (int  i = 0; i <xmax ; i++)
		{
			if (arr[i][j] == 1)cout << "*";
			else cout << " ";
		}
		cout << endl;
	}

	
	cout << endl;
}
void  DDAline(int  x0, int  y0, int  x1, int  y1)
{
	int  dx, dy, epsl, k;   
	float  x, y, xIncre, yIncre;
	dx = x1 - x0;    dy = y1 - y0;    x = x0;  y = y0;
	if (abs(dx)>abs(dy)) epsl = abs(dx);
	else  epsl = abs(dy);
	xIncre = (float)(dx) / epsl;
	yIncre = (float)(dy) / epsl;
	for (k = 0; k <= epsl; k++)
	{
		int tx = (int)(x + 0.5);
		int ty = (int)(y + 0.5);
		arr[tx][ty] = 1;
		//putpixel((int)(x + 0.5), (int)(y + 0.5));
		x += xIncre;  
		y += yIncre;
	}
	drawLine(x0, y0, x1, y1);
}
int main()
{
	int x0, y0,x1,y1;
	while (true)
	{
		cout << "请输入第一个点的x，y值：";
		cin >> x0 >> y0;
		cout << "请输入第二个点的x，y值：";
		cin >> x1 >> y1;

		if (y0 > y1)//交换值使得y1在y0下面
		{
			int temp = y1;
			y1 = y0;
			y0 = temp;
			temp = x1;
			x1 = x0;
			x0 = temp;
		}
		drawLine(x0, y0, x1, y1);
	}
	return 0;
}

```
### 中点BH画圆法
```cpp
#include<stdio.h>
int arr[100];//存储由算法找到的第一象限y>=x 区间的所有的圆点坐标
int arrXY[100][100];//存储最终的圆点矩阵

//int r: r为要画的圆半径
void Circle(int r,int numOfarr)
{
	int x, y;
	
	//找到其他划分区间的圆点坐标，在存储矩阵上标记
	for (int i = 0; i < numOfarr; i++)
	{
		//-x,-y
		if (i == 0)x = r;
		else x = -i + r;
		y = -arr[i] + r;
	    arrXY[x][y] = 1;

		//-y,-x
		if (i == 0)y = r;
		else y = -i + r;
		x = -arr[i] + r;
		arrXY[x][y] = 1;

		//y,-x
		if (i == 0)y = r;
		else y = -i + r;
		x = arr[i] + r;
		arrXY[x][y] = 1;

		//x,-y
		if (i == 0)x = r;
		else x = i + r;
		y = -arr[i] + r;
		arrXY[x][y] = 1;

		//x,y
		if (i == 0)x = r;
		else x = i + r;
		y = arr[i] + r;
		arrXY[x][y] = 1;

		//y,x
		if (i == 0)y = r;
		else y = i + r;
		x = arr[i] + r;
		arrXY[x][y] = 1;

		//-y,x
		if (i == 0)y = r;
		else y = i + r;
		x = -arr[i] + r;
		arrXY[x][y] = 1;

		//-x,y
		if (i == 0)x = r;
		else x = -i + r;
		y = arr[i] + r;
		arrXY[x][y] = 1;
	}
	
	for (int i = 0;i<=2*r; i++)
	{
		for (int j = 0; j <= 2*r; j++)
		{ 
			if (arrXY[j][i] <= 0)printf(" ");
			else if(arrXY[j][i]==1)printf("*");
			else printf("+");
		}
		printf("\n");
	}
}
void Draw(int r)
{
	int x=0, y=r, d=1-r;
	
	while (x<=y)
	{
		arr[x] = y;//存储坐标，
		if (d < 0)d += 2 * x + 3;
		else{
			d += 2 * (x - y) + 5;
			y--;
		}
		x++;
	}
	Circle(r,x);
	printf("\n");
	return;
}


int main()
{
	int r = 25;
	printf("请输入圆半径：");
	scanf("%d", &r);
	Draw(r);

	return 0;
}
```
