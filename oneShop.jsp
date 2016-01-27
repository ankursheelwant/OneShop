<%
//String productCatalog="[{\"productId\":1, \"companyName\":\"Google\", \"productType\":\"Mobile\", \"productName\":\"Nexus 6p\", \"price\":600, \"color\":\"Black\"},{\"productId\":2, \"companyName\":\"Google\", \"productType\":\"Mobile\", \"productName\":\"Nexuserwe 6p\", \"price\":600, \"color\":\"Black\"}]";



	//read user input
	//ArrayList<Object> arrList=new ArrayList<>();
	
	String user = request.getParameter("user");  //q is the name of the parameter from AJAX call
	
	
	if(user.contains("ankur"))
	{
		out.println("y");
	}
	if(user.contains("ank"))
	{
		out.println("y");
	}
	
	
		
		
%>

