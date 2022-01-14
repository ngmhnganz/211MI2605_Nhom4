// Toast function
function dialog({ title = "", message = "", type = "info", choice = "oneButton"}) {
    const main = document.getElementById("dialog");
    if (main) {
        const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "far fa-times-circle"
        };
        const icon = icons[type];
        const htmls ={
            oneButton : `
            <div class="dialog_box active">
            <div class="dialog_bg_shadow"></div>
            <div class="dialog_box_wrap">
            <div class="dialog_header">
                ${title}
            </div>
            <div class="dialog_body">
                <i id="dialog_icon" class="${icon} fa-3x"></i>
                ${message}
            </div>
            <div class="dialog_footer">
                <div class="dialog_btn_grp">
                <div class="btn btn_confirm">OK</div>
                </div>
            </div>
            </div>
        </div>
            `,
            twoButton : `
            <div class="dialog_box active">
            <div class="dialog_bg_shadow"></div>
            <div class="dialog_box_wrap">
            <div class="dialog_header">
                ${title}
            </div>
            <div class="dialog_body">
                <i id="dialog_icon" class="${icon} fa-3x"></i>
                ${message}
            </div>
            <div class="dialog_footer">
                <div class="dialog_btn_grp">
                <div class="btn btn_cancel">Hủy</div>
                <div class="btn btn_confirm">OK</div>
                </div>
            </div>
            </div>
        </div>
            `
        }
        const html = htmls[choice]
        $('#dialog').css('z-index','99999')
        $('#dialog').css('display','block')
        
        main.innerHTML = html;
        switch (type) {
            case 'error':
                $('#dialog_icon').css('color','#ff623d')
                break;
            case 'info':
                $('#dialog_icon').css('color','var(-primary-color)')
                break;
        }
        $('.btn_cancel').click(()=>{
            $('#dialog').html('')
            $('#dialog').css('z-index','')
            $('#dialog').css('display','none')
        })

        $('.btn_confirm').click(()=>{
            $('#dialog').html('')
            $('#dialog').css('z-index','')
            $('#dialog').css('display','none')
        })

    }
}
    