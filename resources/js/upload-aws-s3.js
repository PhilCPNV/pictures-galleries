$(function() {

    let uploading = false;
    let doneUploading = false;

    let uploadImage = function(attributes, inputs, file_input, callback) {
        let file = file_input[0].files[0];
        if(file !== undefined && uploading === false && doneUploading === false) {
            uploading = true;
            let data = new FormData();
            $.each(inputs, function(name, value) { data.append(name, value) });
            data.append('file', file);

            $.ajax({
                url: attributes['action'],
                type: attributes['method'],
                data: data,
                processData: false,
                contentType: false,

                success: callback,
                error: function (errorData) {
                    console.log(errorData);
                }
            });
        }
    };

    let $form = $('#image-form');
    $form.submit(function(e) {
        if (!doneUploading) {
            let $submit = $form.find('button[type="submit"]');
            $submit.attr('disabled','disabled');
            $submit.html('<i class="fa fa-btn fa-spinner fa-spin"></i> Saving');

            let attributes = $(this).data('s3-attributes');
            let inputs = $(this).data('s3-inputs');
            let file_input = $form.find('input[type=file]');

            uploadImage(attributes, inputs, file_input, function(){
                doneUploading = true;
                uploading = false;
                let name = file_input.attr('name');
                file_input.remove();
                $form.append('<input type="hidden" name="'+ name +'" value="'+ inputs['key'] +'">');
                $form.submit();
            });

            if(uploading === true) {
                e.preventDefault();
            }
        }
    });
});