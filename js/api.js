var access_token="c8bd457ac08a466f9ede72a2fcfba99c691f28fa";
var server="https://api.github.com";
var owner="FREEX00";
var repo="bbs";
var o_r=owner+"/"+repo;
var fileContent=""

var mui=$;
//获取文件内容
function getFileContent(path){
	//https://api.github.com/repos/FREEX00/bbs/contents/index.html
	//?access_token=c8bd457ac08a466f9ede72a2fcfba99c691f28fa
	mui.ajax(server+'/repos/'+o_r+'/contents/'+path,{
		data:{
			access_token:access_token
		},
		dataType:'json',//服务器返回json格式数据
		type:'get',//HTTP请求类型
		async:false,
		timeout:10000,//超时时间设置为10秒；
		success:function(data){
			fileContent=window.atob(data.content)
		},
		error:function(xhr,type,errorThrown){
			console.log()
			if(xhr.status==404){
				createFile(path,"{'a':'a','b':'b'}");
			}
		}
	});
}

//创建文件
function createFile(path,content){
	var url=server+'/repos/'+o_r+'/contents/'+path;
	var body={"message":"0","content":window.btoa(content)};
	mui.ajax(url+"?access_token="+access_token,{
		data:JSON.stringify(body),
		dataType:'json',//服务器返回json格式数据
		type:'put',//HTTP请求类型
		timeout:10000,//超时时间设置为10秒；
		success:function(data){
			console.log(window.btoa(data.content))
		},
		error:function(xhr,type,errorThrown){
			console.log(xhr)
		}
	});
}