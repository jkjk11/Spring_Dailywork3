



//입력상자에 어떤 key던 입력이 되면 무조건 호출
function searchBook(){

    //enter key가 입력됐을 때 사용자가 입력한 내용을 가지고
    //서버 프로그램을 AJAX 방식으로 호출
    if(event.keyCode==13){
        //AJAX 호출
        $.ajax({
            //url: 서버프로그램에 대한 url
            //http: 우리가 사용하는 protocol
            //localhost: 찾아가야할 서버쪽 컴퓨터의 IP
            //7070: Tomcat Web Server
            //book:우리 프로젝트에 대한 context root (맨처음 프로젝트 만들때 설정하는 것)
            //bookList: 프로젝트 안에 잇는 Servlet
            url: "http://localhost:7070/book/bookList",
            //type: 전송방식(get or post)
            type: "GET",
            //만약 서버쪽에서 보내주는 데이터가 JSON이면
            //그리고 JSONP방식으로 사용할 거면 jsonp라는 값을 이용
            dataType: "jsonp",
            //클라이언트가 서버쪽에 보내주는 데이터
            jsonp:"callback",
            //jsonp를 이용하기 위해 추가
            data:{
                keyword: $("#keyword").val()
            },
            //서버쪽 프로그램을 실행시키는 과정이 성공하면 success 호출
            success:function(result){

                alert(result.length);
                $("#bodyList").empty();

                for(var i=0; i<result.length; i++ ) {



                    var tr = $("<tr></tr>").attr("data-isbn", result[i].isbn);
                    var img = $("<img width='170px' height='230px'>").attr("src", result[i].img);
                    var imgTd = $("<td width='240px'></td>").append(img);
                    var titleA=$("<a href='#' onclick='detailInfo(this)'></a>").text(result[i].title);
                    var titleTd = $("<td></td>").append(titleA);
                    var authorTd = $("<td></td>").text(result[i].author);
                    var priceTd = $("<td></td>").text(result[i].price);
                    var deleteTd=$("<td width='80px'><input type='button' value='삭제' class='btn-xs, btn-danger' onclick='deleteRow(this)'> </td>");
                    var updateTd=$("<td width='80px'><input type='button' value='수정' class='btn-xs, btn-primary' onclick='updateRow(this)'> </td>");
                    var reviewTd=$("<td width='80px'><input type='button' value='서평보기' class='btn-xs, btn-success' onclick='reviewLink(this)'> </td>");

                    //titleTd.on("click", detailInfo);

                    // var updatebtn=$("<input/>").attr("type", "button").attr("value", "수정");


               //     var updatebtnTd=$("<td></td>").append(updatebtn);


                    tr.append(imgTd);
                    tr.append(titleTd);
                    tr.append(authorTd);
                    tr.append(priceTd);
                    tr.append(deleteTd);
                    tr.append(updateTd);
                    tr.append(reviewTd);



                    $("tbody").append(tr);
                }





            },
            //서버쪽 프로그램 호출하는데 실패하면 error 호출
            error: function(){
                alert("에러 발생")
            }

        });
    }

}