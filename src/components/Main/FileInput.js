import './FileInput.scss';

/*var inputs = document.querySelectorAll( '.file-input' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = e.target.value.split( '\' ).pop();

		if( fileName )
			label.querySelector( 'span' ).innerHTML = fileName;
		else
			label.innerHTML = labelVal;
	});
});*/

function FileInput(props) {
  return (
    <>
      <input type="file" name="file" id="media-input" className="file-input" />
      <label className='file-label' for="media-input">{props.text}</label>
    </>
  );
}

export default FileInput;
