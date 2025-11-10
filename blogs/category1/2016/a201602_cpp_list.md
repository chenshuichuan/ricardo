---
title: 带链表头指针和尾指针的 list 模板实现
date: 2016/01/20
tags:
 - Cpp
categories:
 - 后端开发
 - 算法

---
### 摘要
本文实现了一个模板化的链表类(List)和结点类(Node)。Node类包含数据域(info)和指针域(link)，提供插入删除操作，并将List类声明为友元。List类封装链表操作，包括创建/删除结点、查找数据、计算长度、打印链表等功能。实现方法包括头尾指针管理、前插/后插、有序插入等操作，并处理空链表、尾结点等特殊情况。所有方法都采用模板设计，支持泛型编程。代码结构规范，使用头文件保护宏，内存管理完善，析构函数自动清理资源。

### 模版
```cpp
template<typename T>class List;
template<typename T>class Node{
    T info;                          //数据域
    Node<T> *link; 
//指针域，注意结点类格式，尖括号中是参数名表，类模板实例化为类
public:
    Node();   //生成头结点的构造函数
    Node(const T & data); //生成一般结点的构造函数
    void InsertAfter(Node<T>* p); //在当前结点后插入一个结点
    Node<T>* RemoveAfter();  //删除当前结点的后继结点并返回
    friend class List<T>;
    //声明List为友元类，List可直接访问Node的私有函数
};
template <typename T> Node<T>::Node():link(0){ }
template <typename T> Node<T>::Node(const T & data)
	:info(data),link(0){   }	
 
template<typename T>
void Node<T>::InsertAfter(Node<T>* p)
{
	p->link=link;
	link=p; 
}
template<typename T>Node<T>* Node<T>::RemoveAfter()
{
	Node<T>* tempP=link;
	if(link==0) tempP=0;    //已在链尾,后面无结点
	else link=tempP->link;
	return tempP; 
}
```

### 实现

```cpp
#ifndef LISTCLASS_H
#define LISTCLASS_H
 
 
template<typename T>class List{
 
    Node<T> *head,*tail; //链表头指针和尾指针
public:
    List();  //构造函数，生成头结点(空链表)
    ~List(); //析构函数
    void MakeEmpty(); //清空链表，只余表头结点
    Node<T>* Find(T data); //不是所有符合条件的结点
     //搜索数据域与data相同的结点，返回第一个结点的地址
    int Length();    //计算单链表长度
    void PrintList();   //打印链表的数据域
    void InsertFront(Node<T>* p);      //可用来向前生成链表
    void InsertRear(Node<T>* p);   //可用来向后生成链表 
    void InsertOrder(Node<T> *p);  //按升序生成链表
    Node<T>*CreatNode(T data);   //创建结点(孤立结点,可不要)
    Node<T>*DeleteNode(Node<T>* p); 
}; //删除指定结点
 
template<typename T>List<T>::List()
{
    head=new Node<T>();  tail=head;
}
template<typename T>List<T>::~List()
{
    MakeEmpty();	delete head;
}
template<typename T>void List<T>::MakeEmpty()
{//清空链表
    Node<T> *tempP;
    while(head->link!=0)
	{
           tempP=head->link;       
		   head->link=tempP->link; 
       //把头结点后的第一个结点从链中脱离
      delete tempP;
	}  //删除(释放)脱离下来的结点
    tail=head; 
} //表头指针与表尾指针均指向表头结点，表示空链
 
template<typename T> Node<T>* List<T>::Find(T data)
{
    Node<T> *tempP=head->link;
    while(tempP!=0&&tempP->info!=data)
             tempP=tempP->link;
    return tempP; //搜索成功返回第一个结点地址，不成功返回0
 }
template<typename T>int List<T>::Length()
{ //链表长度
    Node<T>* tempP=head->link; int count=0;
    while(tempP!=NULL){
      tempP=tempP->link;count++;}
    return count;
}
template<typename T>void List<T>::PrintList()
{//显示链表
    Node<T>* tempP=head->link;
    while(tempP!=0){
      cout<<tempP->info<<'\t';	tempP=tempP->link; }
    cout<<endl;}
template<typename T>void List<T>::InsertFront(Node<T> *p)
{
    p->link=head->link;
    head->link=p;
    if(tail==head) tail=p;}//如果为空，修改tail指向
template<typename T>void List<T>::InsertRear(Node<T> *p)
{
    p->link=tail->link; //p->link=0;
    tail->link=p;
    tail=p;
}
template<typename T>void List<T>::InsertOrder(Node<T> *p)
{
    Node<T> *tempP=head->link,*tempQ=head; 
       //tempQ指向tempP前面的一个结点
    while(tempP!=0)
	{
      if(p->info<tempP->info)break; 
       //找第一个比插入结点大的结点，由tempP指向
      tempQ=tempP; tempP=tempP->link;
	}
    tempQ->InsertAfter(p);
      //插在tempP指向结点之前，tempQ之后
    if(tail==tempQ) tail=tempQ->link;
}//插入tail后面，修改tail
template<typename T>Node<T>* List<T>::CreatNode(T data)
{
    Node<T>*tempP=new Node<T>(data);    
	return tempP;
}
template<typename T>Node<T>* List<T>::DeleteNode(Node<T>* p)
{
    Node<T>* tempP=head;
    while(tempP->link!=NULL&&tempP->link!=p)
       tempP=tempP->link;
    if(tempP->link==tail) tail=tempP;
    return tempP->RemoveAfter(); 
}
 //本函数所用方法可省一个工作指针，与InsertOrder比较
#endif
```

