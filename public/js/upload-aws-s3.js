/* upload picture directly to AWS s3, adapted from https://natedenlinger.com/uploading-files-directly-to-aws-s3-in-laravel-5-3/ */

$(function() {

    var uploading = false;
    var doneUploading = false;

    var uploadImage = function(attributes, inputs, file_input, callback) {
        var file = file_input[0].files[0];
        if(file !== undefined && uploading === false && doneUploading === false) {
            uploading = true;
            var data = new FormData();
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


    var $form = $('#image-form');
    $form.submit(function(e) {
        if (!doneUploading) {
            var $submit = $form.find('button[type="submit"]');
            $submit.attr('disabled','disabled');
            $submit.html('<i class="fa fa-btn fa-spinner fa-spin"></i> Saving');

            var attributes = $(this).data('s3-attributes');
            var inputs = $(this).data('s3-inputs');
            var file_input = $form.find('input[type=file]');

            uploadImage(attributes, inputs, file_input, function(){
                doneUploading = true;
                uploading = false;
                var name = file_input.attr('name');
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