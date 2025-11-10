---
title: C++模板数组实现有序数组的排列合并算法
date: 2016/01/20
tags:
  - Cpp
  - 排序
categories:
  - 后端开发
  - 算法

---
### 摘要
该程序实现了一个模板类ordarray，用于处理有序数组的合并与排序操作。主要功能包括：
1) 通过setobject方法初始化数组；
2) 使用Insertsort方法实现插入排序；
3) 通过merge方法合并两个有序数组并输出结果。测试用例展示了字符串、字符和整型数组的合并与排序功能，包括中文、字母和数字的排序。程序采用模板设计，支持多种数据类型，展示了通用数据结构的实现与应用。


### 算法
```cpp
#ifndef ARRAYCLASS_H
#define ARRAYCLASS_H
 
#include<iostream>
using namespace std;
template <typename T>class ordarray{
	const static int maxsize=50;
	int last;
	T slist[50];
public:
	ordarray();
	void setobject(const T[],const int length);
	void Insertsort();
	void merge(const ordarray arr2);
};
template <typename T>ordarray<T>::ordarray()
{
	last=-1;
}
template <typename T> void ordarray<T>::setobject(const T temp[],const int length)
{
	for (last=0;last<length&&last<maxsize;last++)
	{
		slist[last]=temp[last];
	}			
}
template <typename T> void ordarray<T>::Insertsort()
{
	int i,j;
	T temp;
	for (i=1;i<last;i++)
	{
		temp=slist[i];
		j=i;
		while(j>0&&temp<slist[j-1])
		{
			slist[j]=slist[j-1];
			j--;
		}
		slist[j]=temp;
	}
}
template<typename T>void ordarray<T>::merge(const ordarray arr2)
{
	int i=0,j=0,asize=0;
	ordarray<T> temp;
	
	while((i<last)&&(j<arr2.last))
	{
		if(slist[i]<=arr2.slist[j]) {temp.slist[asize]=slist[i];i++;}
 
		else {temp.slist[asize]=arr2.slist[j];j++;}
		asize++;
	}
	if(i==last){	for(;j<arr2.last;j++){	temp.slist[asize]=arr2.slist[j];  asize++; }}
 
	else{	for(;i<last;i++){temp.slist[asize]=slist[i];	asize++; }}
	
	cout<<"打印："<<endl;
	cout<<"array1=";
	for(i=0;i<last;i++)cout<<slist[i]<<'\t';
	cout<<endl;
	cout<<"array2=";
	for(i=0;i<arr2.last;i++)cout<<arr2.slist[i]<<'\t';
	cout<<endl;
	cout<<"array1+array2=";
	for(i=0;i<asize;i++)cout<<temp.slist[i]<<'\t';
	cout<<endl;	
}
 
#endif

```

### 测试

```cpp
#include"arrayclass.h"
#include<iostream>
using namespace std;
#include<string>
 
int main(){
	int i=0;
	ordarray<string> sarr1;
	ordarray<string> sarr2;
	string str1[3]={"啊啊","拜拜","此处"};//******ASCII码从大到小排序
	string str2[5]={"到底","恩恩","方法","刚刚","哈哈"};
	sarr1.setobject(str1,3);
	sarr2.setobject(str2,5);
	sarr1.merge(sarr2);
 
	string str3[3]={"a","c","e"};
	string str4[5]={"b","d","f","g","h"};
	sarr1.setobject(str3,3);
	sarr2.setobject(str4,5);
	sarr1.merge(sarr2);
 
	ordarray<char> carr1;
	ordarray<char>carr2;
	char cstr1[3]={'a','b','c'};
	char cstr2[5]={'d','e','f','g','h'};
	carr1.setobject(cstr1,3);
	carr2.setobject(cstr2,5);
	carr1.merge(carr2);
 
	char cstr3[3]={'a','c','f'};
	char cstr4[5]={'b','d','e','g','h'};
	carr1.setobject(cstr3,3);
	carr2.setobject(cstr4,5);
	sarr1.merge(sarr2);
 
	ordarray<int> iarr1;
	ordarray<int> iarr2;
	int score1[5]={96,97,98,99,100};
	int score2[10]={86,87,88,89,90,91,92,93,94};
	iarr1.setobject(score1,5);
	iarr2.setobject(score2,10);
	iarr1.merge(iarr2);
 
	int score3[3]={96,98,100};
	int score4[5]={91,92,96,97,100};
	iarr1.setobject(score3,3);
	iarr2.setobject(score4,5);
	iarr1.merge(iarr2);
 
	int score5[8]={96,98,100,1,10,20,15,11};
	int score6[10]={91,92,96,97,100,22,11,33,44,55};
	iarr1.setobject(score5,8);
	iarr2.setobject(score6,10);
	iarr1.Insertsort();//调用排序功能
	iarr2.Insertsort();
	iarr1.merge(iarr2);
 
	return 0;
}
```

