---
title: UDP协议实现对等通讯Java+RSA加密解密传送信息实现
date: 2016/06/24
tags:
  - java
  - 网络协议
categories:
  - 后端开发
  - 算法

---
### 摘要
本文介绍了一个基于UDP协议的对等通讯Java实现方案，采用RSA加密算法确保信息安全。
系统包含客户端和服务器端（两者代码相同），通过DatagramSocket实现消息收发。
客户端使用服务器公钥加密发送消息，接收时用自身私钥解密。

文章详细展示了包括界面设计、密钥初始化、消息加密/解密和网络通信在内的完整代码实现，
实现了本地主机（127.0.0.1）在55512和55513端口间的安全通讯。
该方案采用固定RSA密钥参数，通过时间戳记录通讯过程，具有完整的错误处理机制。

### 思路流程
![github](/old/a201608_java01.png "github")

### 执行效果
![github](/old/a201608_java02.png "github")

### 代码
下面贴出客户端代码（RSA算法部分参照开头的说明链接，因为是对等通讯，所以服务端代码和客户端是一样的，只是他们的监听和发送端口互换而已）：
```java

import java.awt.EventQueue;
import java.awt.Rectangle;
import java.awt.TextArea;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.EmptyBorder;
 
import java.awt.event.ActionEvent;
import java.awt.event.WindowEvent;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.SocketException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import myrsa2.RSAUtils;
 
public class ClientWindow1 extends JFrame implements Runnable
{
	private static final long serialVersionUID = -9061845795224200533L;
	private JPanel contentPane;
 
	JLabel jLabel1 = new JLabel();
	TextArea jTextArea1 = new TextArea("你好!  ", 100, 250,TextArea.SCROLLBARS_VERTICAL_ONLY);
	JLabel jLabel2 = new JLabel();
	JTextField jTextField1 = new JTextField();
	Thread c;
	private DatagramSocket sendSocket, receiveSocket;
	private DatagramPacket sendPacket, receivePacket;
 
	//server端公钥参数
	private String public_exponent="65537";
	private String modulus="104344065049535235337602750745972062206029307981021347712560211453856339371441553987973583092897777954138410872748183586468653712704255491417965770505559379560464351555212396558781035059397673682011104226754831711072822991514780158821061675743098642785196847109412740308768227675829387795015925250708654667999";
	private RSAPublicKey pubKey;
	
	//client 端公钥密钥参数
	private String client_modulus="113073745494321136725643384276722554235918070888758423613996572688337880324241477133718433831999005142699224319183845232695295297468715990337671678419444783042160223540025404015195691927944232410884578134672967651594589403061833363946041818438441160271287476138927799777730705047831779398357394582752490728477";
	private String client_public_exponent="65537";
	private String client_private_exponent="96655390029103626966557334491451763291733925099701476254325068260270936930960095678899558748530086319165559082426693223382564625471030692505099487262702213820107182483208312048057602807578526587131082022149038938961334471000154642010315296540992797729318728885945908324955019647195175495375437240594636763713";
	private RSAPublicKey client_pubKey;
	private RSAPrivateKey client_priKey;  
	/**
	 * Launch the application.
	 */
	public static void main(String[] args)
	{
		EventQueue.invokeLater(new Runnable()
		{
			public void run()
			{
				try
				{
					ClientWindow1 frame = new ClientWindow1();
					frame.setVisible(true);
				} catch (Exception e)
				{
					e.printStackTrace();
				}
			}
		});
	}
	/*initial the pubkey and prikey 
	 */
	public void InitKey()
	{
		//使用模和指数生成公钥和私钥  
	    pubKey = RSAUtils.getPublicKey(modulus, public_exponent); 
	    jTextArea1.append("\nserver publicKey:" + pubKey);
	    client_pubKey = RSAUtils.getPublicKey(client_modulus, client_public_exponent); 
	    jTextArea1.append("\nclient publicKey:" + client_pubKey);
	    client_priKey= RSAUtils.getPrivateKey(client_modulus, client_private_exponent);	
	}
	
	/**
	 * Create the frame.
	 */
	public ClientWindow1()
	{
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		setBounds(100, 100, 430, 500);
		contentPane = new JPanel();
		contentPane.setBorder(new EmptyBorder(5, 5, 5, 5));
		setContentPane(contentPane);
		contentPane.setLayout(null);
 
		//this.setSize(new Dimension(400, 400));
		this.setTitle("UDPClient");
		jLabel1.setText("通信记录:");
		jLabel1.setBounds(new Rectangle(10, 3, 70, 30));
		contentPane.setLayout(null);
		jTextArea1.setBounds(new Rectangle(15, 30, 400, 350));
		jTextArea1.setEditable(false);
		InitKey();
		jLabel2.setText("输入通信内容:");
		jLabel2.setBounds(new Rectangle(17, 385, 92, 37)); // 创建输入内容区域
		jTextField1.setText("");
		jTextField1.setBounds(new Rectangle(130, 385, 244, 31));
		jTextField1.setEditable(true);
		//监听输入框的回车事件
		jTextField1.addActionListener(new java.awt.event.ActionListener()
		{
			public void actionPerformed(ActionEvent e)
			{
				//执行，发送输入框信息
				jTextField1_actionPerformed(e);
			}
		});
		contentPane.add(jLabel1, null);
		contentPane.add(jTextArea1, null);
		contentPane.add(jTextField1, null);
		contentPane.add(jLabel2, null);
		try
		{
			sendSocket = new DatagramSocket();
			receiveSocket = new DatagramSocket(55512);
		} catch (SocketException e)
		{
			jTextArea1.append("不能打开数据报Socket,或者数据报Socket无法与指定端口连接！");
		}
		// 创建一个线程,监听本机55512端口，执行run();方法
		c = new Thread(this); 
		c.start();
	}
	protected void processWindowEvent(WindowEvent e) {
        super.processWindowEvent(e);
        if (e.getID() == WindowEvent.WINDOW_CLOSING) {
            System.exit(0);
        }
    }
	
	void jTextField1_actionPerformed(ActionEvent e)
	{
		try
		{
			Date date=new Date();
			DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String time=format.format(date);
			jTextArea1.append("\n\n客户端:"+time);
			String string1 = jTextField1.getText().trim();
			jTextArea1.append("\n加密前明文:"+string1);
			//加密后的密文  
			string1 = RSAUtils.encryptByPublicKey(string1, pubKey);
			jTextArea1.append("\n加密后密文:"+string1);
			//将信息发送到IP： 127.0.0.1 的55513端口
			sendPacket = new DatagramPacket(string1.getBytes(),
					string1.getBytes().length,
					java.net.InetAddress.getByName("127.0.0.1"), 55513);
			sendSocket.send(sendPacket);
		} catch (IOException ioe)
		{
			jTextArea1.append("\n网络通信出现错误,问题在于" + e.toString());
		} catch (Exception e1)
		{
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
	}
 
	@Override
	public void run()
	{
		// TODO Auto-generated method stub
		while (true)
		{
			try
			{
				byte buf[] = new byte[256];//接受的最大长度，超出的长度被丢弃
				receivePacket = new DatagramPacket(buf, buf.length);
				receiveSocket.receive(receivePacket);
				
				Date date=new Date();
				DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String time=format.format(date);
				jTextArea1.append("\n\n服务器："+time);
				byte[] data = receivePacket.getData();
				String receiveString = new String(data);
				jTextArea1.append("\n解密前密文："+receiveString);
				receiveString = RSAUtils.decryptByPrivateKey(receiveString, client_priKey); 
				jTextArea1.append("\n解密后密文："+receiveString);
			} catch (IOException e)
			{
				jTextArea1.append("\n网络通信出现错误,问题在于" + e.toString());
			} catch (Exception e)
			{
				// TODO Auto-generated catch block
				jTextArea1.append("\nRSAUtils.decryptByPrivateKey error!!!:" + e.toString());
			}
		}
	}
 
}
```