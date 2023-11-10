const tg=window.Telegram.WebApp

export function useTelegram(){

    const onClose=()=>{
        tg.close()
    }
    const onToggleButton=()=>{
        if(tg.MainButton.isVisible){
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }
    const buttonTelegram= tg.MainButton
    buttonTelegram.setText("Готово")
    
    return {
        user:tg.initDataUnsafe?.user,
        tg,
        onClose:onClose,
        onToggleButton:onToggleButton,
        buttonTelegram

    }
}