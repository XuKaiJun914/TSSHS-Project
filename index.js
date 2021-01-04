const express = require('express');
const app = express();
var readline = require('readline');
var rl = readline.createInterface({ 
    input:process.stdin,
    output:process.stdout
    });
let server = app.listen(3000, function () {
let host = server.address().address;
let port = server.address().port;
});

const request = require('request')
const cheerio = require('cheerio')
const iconv = require('iconv-lite');
const { createBrotliCompress } = require('zlib');
const { TLSSocket } = require('tls');
var headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
console.log("  辭修學校財團法人新北市私立辭修高級中學 歷年成績查詢系統 \n  非常感謝您使用本套軟體，作者已盡力把代碼優化，為了給您最佳體驗 \n  請務必確認執行環境為聯網狀態 \n\n  作者:許凱俊")
shouldIncludeTippy()
function shouldIncludeTippy() {
    rl.question("\n  請輸入欲查詢的學號:",function(answer){ 
        var stdid = Number(answer)
        if (!isNaN(stdid)){
        const url = `http://student.tsshs.ntpc.edu.tw/jun_school/CLSClsStdYearSco.asp?Std_id=${stdid}`
    
        request({
            url: url, 
            encoding: null
         }, function (err, sres, body) {
            var html = iconv.decode(body, 'Big5')
            var $ = cheerio.load(html, {decodeEntities: false});
            let newans = []
            $('.Body').each(function(i, elem) {
                newans.push($(this).text().split('\n'))
            });
             var ans = newans[0]
             if (ans[19] == "此處需要物件: 'rs'"){
                app.get('/', async (req, res, next) => {
                   res.send(`${ans[11]}為錯誤的值`)
             });
             console.log(`${ans[11]}為錯誤的值`)
             shouldIncludeTippy();
             }else{
                 
                app.get('/', async (req, res, next) => {
                    res.send(ans)
              });
                 if (ans[900] == 0 || ans[900] == undefined){
                    ans[0] = " 無法計算"
                }else{
                    var roundDecimal = function (val, precision) {
                        var newval = val.toFixed(precision)
                        return newval;
                      }
                    var ttttt = ((Number(ans[115].substr(4,5)) + Number(ans[272].substr(4,5)) + Number(ans[429].substr(4,5)) + Number(ans[586].substr(4,5)) + Number(ans[743].substr(4,5)) + Number(ans[900].substr(4,5)))/6)
                    var tt = roundDecimal (ttttt, 2)
                    ans[0] = ` ${tt}`

                }
                let biggood = []
                let good = [] 
                let smallgood = [] 
                let bigbad = []
                let bad = []
                let smallbad = []

                biggood[1] = Number(ans[152])
                biggood[2] = Number(ans[309])
                biggood[3] = Number(ans[466])
                biggood[4] = Number(ans[623])
                biggood[5] = Number(ans[780])
                biggood[6] = Number(ans[937])

                good[1] = Number(ans[153])
                good[2] = Number(ans[310])
                good[3] = Number(ans[467])
                good[4] = Number(ans[624])
                good[5] = Number(ans[781])
                good[6] = Number(ans[938])

                smallgood[1] = Number(ans[154])
                smallgood[2] = Number(ans[311])
                smallgood[3] = Number(ans[468])
                smallgood[4] = Number(ans[625])
                smallgood[5] = Number(ans[782])
                smallgood[6] = Number(ans[939])

                bigbad[1] = Number(ans[155])
                bigbad[2] = Number(ans[312])
                bigbad[3] = Number(ans[469])
                bigbad[4] = Number(ans[626])
                bigbad[5] = Number(ans[783])
                bigbad[6] = Number(ans[940])

                bad[1] = Number(ans[156])
                bad[2] = Number(ans[313])
                bad[3] = Number(ans[470])
                bad[4] = Number(ans[627])
                bad[5] = Number(ans[784])
                bad[6] = Number(ans[941])

                smallbad[1] = Number(ans[157])
                smallbad[2] = Number(ans[314])
                smallbad[3] = Number(ans[471])
                smallbad[4] = Number(ans[628])
                smallbad[5] = Number(ans[785])
                smallbad[6] = Number(ans[942])

                for (let i = 1; i < 7; i++) {
                    if (isNaN(biggood[i])) {biggood[i] = 0}
                    if (isNaN(good[i])) {good[i] = 0}
                    if (isNaN(smallgood[i])) {smallgood[i] = 0}
                    if (isNaN(bigbad[i])) {bigbad[i] = 0}
                    if (isNaN(bad[i])) {bad[i] = 0}
                    if (isNaN(smallbad[i])) {smallbad[i] = 0}
                }
                let allbiggood = (biggood[1] + biggood[2] + biggood[3] + biggood[4] + biggood[5] + biggood[6])
                let allgood = (good[1] + good[2]+ good[3] + good[4] + good[5] + good[6])
                let allsmallgood = (smallgood[1] + smallgood[2]+ smallgood[3] + smallgood[4] + smallgood[5] + smallgood[6])
                let allbigbad = (bigbad[1] + bigbad[2]+ bigbad[3] + bigbad[4] + bigbad[5] + bigbad[6])
                let allbad = (bad[1] + bad[2]+ bad[3] + bad[4] + bad[5] + bad[6])
                let allsmallbad = (smallbad[1] + smallbad[2]+ smallbad[3] + smallbad[4] + smallbad[5] + smallbad[6])
            var consoletext ="\n" + ans[8] + ans[9] + ans[10] + ans[11] + "\n\n" + "  一年級上學期 :" + a(ans[115]) + "       大功總次數 :" + allbiggood +  "\n" + "  一年級下學期 :" + a(ans[272]) + "       小功總次數 :" + allgood  + "\n" + "  二年級上學期 :" + a(ans[429]) + "       嘉獎總次數 :" + allsmallgood  + "\n" + "  二年級下學期 :" + a(ans[586]) + "       大過總次數 :" + allbigbad  + "\n" + "  三年級上學期 :" + a(ans[743]) + "       小過總次數 :" + allbad   + "\n" + "  三年級下學期 :" + a(ans[900]) + "       警告總次數 :" + allsmallbad   + "\n" + "  國中成績平均 :" + ans[0] + "\n"
            console.log(consoletext)
            shouldIncludeTippy();
             }
             function a(data) {
                var no =""
                if (data == 0 || data == undefined){
                   no = " 尚無成績   " 
                    return no
                }else{
                    var newdata = Number(data.substr(4,5))
                    return " " + newdata.toFixed(2) + "      "
                }
            }
         });
        }else{
            console.log("  請輸入學號，不要輸入其他東西")
            shouldIncludeTippy();
        }
    });
}