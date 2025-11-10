---
title: C++ 实现mystring类型
date: 2016/01/20
tags:
  - Cpp
categories:
  - 后端开发
  - 算法
---
### 摘要
本文实现了一个自定义字符串类mystring，包含构造函数、拷贝构造函数、析构函数和常用运算符重载。
类采用动态内存管理，支持字符串赋值、连接、比较等操作。通过重载[]运算符实现了字符访问，重载=、+、+=等运算符实现字符串操作，并包含字符串输出功能。
代码演示了如何创建字符串对象、进行基本操作和运算符重载的实现细节，包括内存管理、边界检查等。
最后通过示例展示了字符串连接、比较和字符读写等操作。

### 模版
```cpp
const int MS=100;
class mystring{
	char *str;        //存放字符串的数组容器
	int maxsize;          //最大可用元素数，可防止数组出界，提高健壮性
	int last;              //已用元素最大下标
public:
	mystring();
	mystring(char *s);
	mystring(mystring & st);
	~mystring();
	void show();
	char & operator[](int i);
 
	mystring &operator=(const mystring &);
	mystring & operator=(char * st);//这里重载的=是把C风格字符串赋给mystring
	mystring operator+(mystring &);
	mystring operator+=(mystring &);
	bool operator<(mystring &);
	bool operator==(mystring &);
};
mystring::mystring()
{
		last=0;
		maxsize =MS;
		str=new char[last];
		str[last]=0;
		cout<<"缺省构造函数"<<endl;
}
mystring::mystring(char *s)//当C字符串过长，初始化时采用截尾处理
{
		last=0;
		maxsize =MS;
		str=new char[strlen(s)+1];//s的长度没有包括\0
		do{
			str[last]=s[last];
			last++;
		}while(s[last]!='\0'&&last<maxsize-1);
		str[last] ='\0'; //截尾处理时，必须加串结束符
		cout<<"构造函数"<<endl;
}
mystring::mystring(mystring & st)
{
		last=0;
		maxsize =MS;
		str=new char[st.last+1];//s的长度没有包括\0//重新指向动态内存
		do{
			str[last]=st.str[last];
			last++;
		}while(st.str[last]!='\0'&&last<maxsize-1);
		str[last]='\0';
		cout<<"拷贝构造函数"<<endl;
}
mystring::~mystring()
{
	delete []str;
	str=NULL ;
		cout<<"析构函数"<<endl;
}
void mystring::show(){//如需重载<<，则请参见9.3.3节，暂时未学到，替代方法是用show()函数
		cout<<str<<endl;
}
char & mystring::operator[](int i)
{   //返回引用，可读可写
	//if(i>last){cout<<"access violate!";exit(1);}
	return str[i];
}
mystring &mystring::operator=(const mystring & st){
	if(&st==this)return*this;
	last=st.last;//新的长度
	delete []str;
	str=new char[last+1];
	last=0;
	do{
		str[last]=st.str[last];
		last++;
	}while(st.str[last]!='\0'&& last<maxsize-1);
	str[last] ='\0'; //截尾处理时，必须加串结束符
	return *this;//拷贝的临时变量生命期在调用它的表达式中
}
mystring & mystring::operator=(char* s)
{ //这里返回值为引用，不调用拷贝构造函数
	//delete []str;//这里不能这样？？为什么？
	last=0;
	str=new char[strlen(s)+1];//s的长度没有包括\0	
	do{
		str[last]=s[last];
		last++;
	}while(s[last]!='\0'&&last<maxsize-1);
	str[last] ='\0'; //截尾处理时，必须加串结束符
	return *this;
}
mystring mystring::operator+(mystring & st){//注意+和+=的不同
	mystring temp(*this);
	temp.last=temp.last+st.last;//新的长度
	delete []temp.str;
	temp.str=new char[temp.last+1];//申请空间   s的长度没有包括\0
	temp.last =0;
	do{
		temp.str[temp.last]=str[temp.last];
		temp.last++;
	}while(str[temp.last]!='\0'&& temp.last<temp.maxsize-1);
	if(temp.last<temp.maxsize-1)
	{
		int i=0;
		do{
			temp.str[temp.last]=st.str[i];
			temp.last++;
			i++;
		}while(st.str[i]!='\0'&& temp.last<temp.maxsize-1);
	}
	temp.str[temp.last] ='\0'; //截尾处理时，必须加串结束符
	return temp;//拷贝的临时变量生命期在调用它的表达式中
}
mystring mystring::operator+=(mystring & st){//+=在对象自身进行
	mystring temp(*this);
	int i;//保存原来的长度
	last=last+st.last;//新的长度
	delete []str;
	str=new char[last+1];//申请空间   s的长度没有包括\0
	last=0;
	do{
		str[last]=temp.str[last];
		last++;
	}while(temp.str[last]!='\0'&& last<maxsize-1);	
	if(last<maxsize-1)
	{
		i=0;
		do{
			str[last]=st.str[i];
			i++;
			last++;
		}while(st.str[i]!='\0'&& last<maxsize-1);	
	}
	str[last] ='\0'; //截尾处理时，必须加串结束符*/
	return *this;//拷贝的临时变量生命期在调用它的表达式中
}
bool mystring::operator<(mystring & st){   //重载<运算符
	int i=0,k;
	do{
		k=str[i]-st.str[i];
		i++;
	}while(k==0&&i<last&&i<st.last);
	if(k<0) return true;
	if(i==last&&i!=st.last) return true;
	return false;
}
bool mystring::operator==(mystring & st){
	int i=0,k;
	if(last!=st.last) return false;
	do{
		k=str[i]-st.str[i];
		i++;
	}while(k==0&&i<last);
	if(k!=0) return false;
	else return true;
}
```

### 实现

```cpp
int main(){
	int i=0;
	char *sp1="sp1",*sp2="sp2",*sp3="sp3",*sp4="sp4";
	mystring mstr1(sp1);
	mystring mstr2(sp2);
	mystring mstr3(sp3);
	mystring mstr4(mstr3);
	mystring mstr5=mstr3;
	mystring mstr6; 
	mstr6=sp4; //ms6赋值是返回引用，不用拷贝构造函数
	/*cout<<"mstr1:   ";
	mstr1.show();
	cout<<"mstr2:   ";
	mstr2.show();
	cout<<"mstr3:   ";
	mstr3.show();
	cout<<"mstr4:   ";
	mstr4.show();
	cout<<"mstr5:   ";
	mstr5.show();
	cout<<"ms6:   ";
	mstr6.show();
	mstr6=mstr5;
	cout<<"mstr6=mstr5:  ";
	mstr6.show ();
	mstr6=mstr1+mstr2;
	cout<<"mstr6=mstr1+mstr2:  ";
	mstr6.show ();
	mstr3+=mstr4;
	cout<<"mstr3+=mstr4:  ";
	mstr3.show ();
	mstr4=mstr1+mstr2+mstr6;//注意temp和临时变量由拷贝构造函数生成
	cout<<"mstr4=mstr1+mstr2+mstr6:    ";
	mstr4.show();
	mstr1+=mstr2+mstr3;
	cout<<"mstr1+=mstr2+=mstr3:   ";
	mstr1.show();
	if(mstr1<mstr4) {mstr1.show();cout<<"应排在"<<endl;mstr4.show();cout<<"之前"<<endl;}
	else {mstr1.show();cout<<"应排在"<<endl;mstr4.show();cout<<"之后"<<endl;}
	mstr6=mstr1;//mstr6赋值不是返回引用，必须调用拷贝构造函数建立临时对象
	if(mstr1==mstr6) cout<<"串mstr1与串mstr6相同"<<endl;
	else cout<<"不相同！"<<endl;
	mstr1="C++ programming language";*/
	i=0;
	while(mstr1[i]!='\0') cout<<mstr1[i++];//读出
	cout<<endl;
	mstr1[i++]='.';//写入
	mstr1.show ();
	i--;
	mstr1[i]='\0';
	mstr1.show();
	mstr1[i]='k';
	mstr1.show();
	return 0;
}
```

