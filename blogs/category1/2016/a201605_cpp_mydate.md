---
title: C++ 自定义日期类实现日期的加减算法
date: 2016/01/20
tags:
 - Cpp
categories:
 - 后端开发
 - 算法
---
### 摘要
本文实现了一个C++日期类(Date)，包含日期计算和操作功能。主要特性包括：
1) 构造函数支持年、月、日初始化；
2) 重载运算符实现日期加减(-, +)运算；
3) 比较日期大小(compare)；
4) 计算当年天数(getDaysofYear)和剩余天数(getRemainingDaysofYear)；
5) 辅助函数判断闰年(isLeapYear)。代码演示了日期差计算(d1-d2)等操作，支持日期对象的拷贝和赋值。该日期类封装了日期相关操作，可用于各种日期计算场景。


### 实现

```cpp
#include<iostream>
using namespace std;
class Date{
private:
	int m_year,m_month,m_day;
	int m_totalDaysYear;
public:
	Date(int year=2001,int month=1,int day=1);
	~Date(){};
	Date(const Date & date);
	Date & operator=(const Date & date);
 
	int operator-(const Date &date);
	Date operator+(int days);
	int compare(const Date &date);
	void print();
	int getDaysofYear();
	int getRemainingDaysofYear();
	friend ostream & operator<<(ostream & out, const Date & date);
};
inline bool isLeapYear(int year ){
	if(year%4==0&&year%100!=0||year%400==0) return true;
	else return false;
}
Date::Date(int year,int month,int day):m_year(year),m_month(month),m_day(day){ 
	m_totalDaysYear=isLeapYear(m_year)?366:365;
}
Date::Date(const Date &date){
	m_year=date.m_year;
	m_month=date.m_month;
	m_day=date.m_day;
	m_totalDaysYear=date.m_totalDaysYear;
}
Date & Date::operator=(const Date & date){
	if(this==&date) return *this;
	m_year=date.m_year;
	m_month=date.m_month;
	m_day=date.m_day;
	m_totalDaysYear=date.m_totalDaysYear;
 
	return *this;
}
int Date::operator-(const Date &date){
	int num=0;
	Date bigDate,smallDate;
	int value=compare(date);
	if(value==1){
		bigDate=*this;
		smallDate=date;
	}else if(value==-1){
		bigDate=date;
		smallDate=*this;
	}else return 0;
 
	int yearGap=bigDate.m_year-smallDate.m_year;
	if(yearGap>=2){
		for(int i=smallDate.m_year+1;i<=bigDate.m_year-1;i++){
			if(isLeapYear(i)) num+=366;
			else num+=365;
		}
		num+=bigDate.getDaysofYear();
		num+=smallDate.getRemainingDaysofYear();
	}else if(bigDate.m_year-smallDate.m_year==1){
		num+=bigDate.getDaysofYear();
		num+=smallDate.getRemainingDaysofYear();
	}else{
		num+=bigDate.getDaysofYear();
		num-=smallDate.getDaysofYear();
	}
 
	if(value==1) return num;
	else return -num;
}
Date  Date::operator+(int days){
	int year=m_year,month,day;
	int remainings=getRemainingDaysofYear();
	if(days>remainings){
		days-=remainings;
		year++;
		int num=isLeapYear(year)?366:365;
		while(days>num){ // 找到相应的年份
			days-=num;
			year++;
			num=isLeapYear(year)?366:365;
		}	
	}
	int months[12]={31,28,31,30,31,30,31,31,30,31,30,31};
	if(isLeapYear(year)) months[1]=29;
	month=m_month;
	if(days-(months[m_month-1]-m_day)>0){
		days-=months[m_month-1]-m_day;
		int i=m_month;
		for(;i<12;i++){// 找到相应的月份
			if(days-months[i]<0) break;
			days-=months[i];
		}
		month=i+1;
	}
	day=days;
	return Date(year,month,day);
}
int Date::compare(const Date &date){
	if(m_year>date.m_year){
		return 1;
	}else if(m_year<date.m_year){
		return -1;
	}else{
		if(m_month>date.m_month) return 1;
		else if(m_month<date.m_month) return -1;
		else{
			if(m_day>date.m_day) return 1;
			else if(m_day<date.m_day) return -1;
			else return 0;
		} 
	}
}
 
 
void Date::print(){
	cout<<m_year<<'\\'<<m_month<<'\\'<<m_day<<endl;
}
int Date::getDaysofYear(){
	int months[12]={31,28,31,30,31,30,31,31,30,31,30,31};
	if(isLeapYear(m_year)) months[1]=29;
	int num=0;
	for(int i=0;i<m_month-1;i++){
		num+=months[i];
	}
	return num+m_day;
}
int Date::getRemainingDaysofYear(){
	return m_totalDaysYear-getDaysofYear();
}
 
 
ostream & operator<<(ostream & out, const Date & date){
	out<<date.m_year<<'\\'<<date.m_month<<'\\'<<date.m_day;
	return out;
}
 
 
int main(){
	Date d1(2012,1,20),d2(2014,1,12);
　　Date d3(d2),d4;
　　d4=d1;
　　cout<<d1;
	int days=50;
	cout<<d1<<" - "<<d2<<" = "<<d1-d2<<" days "<<endl;
	return 0;
}
```

