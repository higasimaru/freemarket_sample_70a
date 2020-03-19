$(function(){

  // 画像用のinputを生成する関数
  const buildFileField = (index)=> {
    const html = `<div data-index="${index}" class="js-file_group">
                    <input class="js-file" type="file"
                    name="product[images_attributes][${index}][image]"
                    id="product_images_attributes_${index}_src"><br>
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }

  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];

  $('#image-box').on('change', '.js-file', function(e) {
    // fileIndexの先頭の数字を使ってinputを作る
    $('#image-box').append(buildFileField(fileIndex[0]));
    fileIndex.shift();
    // 末尾の数に1足した数を追加する
    fileIndex.push(fileIndex[fileIndex.length - 1] + 1)
  });

  $('#image-box').on('click', '.js-remove', function() {
    $(this).parent().remove();
    // 画像入力欄が0個にならないようにしておく
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
  });


  $('#new_product_form').submit(function(){
    // 出品ボタン押下時にチェック処理を実行する

    // エラーメッセージを初期化
    $(".sell__main__content__file__up__error").text("");
    $(".sell__main__content__form__name--error").text("");
    $(".sell__main__content__form__description--error").text("");
    $(".sell__main__content__form__box__category--error").text("");
    $(".sell__main__content__form__box__condition--error").text("");
    $(".sell__main__content__form__box__group__shipping_payer--error").text("");
    $(".sell__main__content__form__box__group__shipping_from_area--error").text("");
    $(".sell__main__content__form__box__group__shipping_duration--error").text("");
    $(".sell__main__content__form__box__price__top__error").text("");

    // 送信可否フラグ
    let submit_flg = true;
    // スクロール実行済みフラグ
    let scroll_flg = false;

    // 画像の選択
    let img_first = $("#product_images_attributes_0_image").val();
    if(img_first == ""){

      // エラーメッセージ設定
      $(".sell__main__content__file__up__error").text("画像を選択してください");
      
      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__file")[0].scrollIntoView(true)
        scroll_flg = true
      }
    }

    // 商品名
    let name = $("#product_name").val();
    if(name == ""){
      // エラーメッセージ設定
      $(".sell__main__content__form__name--error").text("入力してください");
      
      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__form")[0].scrollIntoView(true)
        scroll_flg = true
      }

    }

    // 商品説明
    let description = $("#product_description").val();
    if(description == ""){
      // エラーメッセージ設定
      $(".sell__main__content__form__description--error").text("入力してください");

      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__form")[0].scrollIntoView(true)
        scroll_flg = true
      }

    }

    // カテゴリー
    if($("#grandchild_category").length == 0 || $("#grandchild_category").val() == "---"){
      // カテゴリー小区分が存在しない場合、もしくはカテゴリー小区分が選択されていない場合、エラー

      // エラーメッセージを設定
      $(".sell__main__content__form__box__category--error").text("選択してください");

      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__form__box__group")[0].scrollIntoView(true)
        scroll_flg = true
      }
    }

    // 商品の状態
    if($("#product_condition_id").val() == "0"){

      // エラーメッセージを設定
      $(".sell__main__content__form__box__condition--error").text("選択してください");
      
      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__form__box__group")[0].scrollIntoView(true)
        scroll_flg = true
      }
    }

    // 配送料の負担
    if($("#product_shipping_payer_id").val() == "0"){

      // エラーメッセージを設定
      $(".sell__main__content__form__box__group__shipping_payer--error").text("選択してください");

      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__form__box__group")[2].scrollIntoView(true)
        scroll_flg = true
      }

    }

    // 配送元の地域
    if($("#product_shipping_from_area_id").val() == "0"){

      // エラーメッセージを設定
      $(".sell__main__content__form__box__group__shipping_from_area--error").text("選択してください");
      
      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__form__box__group")[2].scrollIntoView(true)
        scroll_flg = true
      }
    }

    // 発送までの日数
    if($("#product_shipping_duration_id").val() == "0"){

      // エラーメッセージを設定
      $(".sell__main__content__form__box__group__shipping_duration--error").text("選択してください");
      
      // 送信可否フラグを設定
      submit_flg = false;

      // エラー位置までスクロール
      if(scroll_flg == false){
        $(".sell__main__content__form__box__group")[2].scrollIntoView(true)
        scroll_flg = true
      }
    }

    // 販売価格
    let price = $("#product_price").val();
    if( price == "" || Number(price) < 300 || 9999999 < Number(price)){

      // エラーメッセージを設定
      $(".sell__main__content__form__box__price__top__error").text("300以上9999999以下で入力してください");
      
      // 送信可否フラグを設定
      submit_flg = false;
    }
    return submit_flg = false;

    
})


});
