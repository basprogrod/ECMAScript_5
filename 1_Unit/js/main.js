$(document).ready(function() {

    $('#link').click(function(e) {
        e.preventDefault();
        document.location = 'http://ig-v.ru/';
    });
    let buttons = document.getElementsByTagName('button');
    let body = $('body')[0];
    let btnsWrp = document.querySelector('.btns')
    body.isChange = false;

    $('#change').click(function(e) {
        e.preventDefault();

        if (body.isChange) {
            body.style.backgroundColor = '#19152A';
            body.isChange = false;
            Array.from(buttons).forEach(function(el) {
                el.style.width = '100px';
                el.style.display = 'inline';
            });
        } else {
            body.style.backgroundColor = '#620707';
            body.isChange = true;
            Array.from(buttons).forEach(function(el) {
                el.style.width = '200px';
                el.style.display = 'block';
            });
        }
    });

    $('#load').click(function(e) {
        // возможно я не правильно понял, что должна делать третяя кнопка,
        // а именно, верстка, которую нужно загрузить, как мне показалось,
        // необходимо сделать на js, как я и сделал. Сильно не заморачивался... 
        e.preventDefault();
        body.innerHTML = '';
        let header = document.createElement('h1')
        header.innerHTML = "Header";
        header.style.textAlign = 'center';
        header.style.color = '#fff';
        let container = document.createElement('div');
        container.style
            .cssText = `
		     width: 80%;
		     margin-left :auto; 
		     margin-right: auto;
		     display: flex;
		     flex-wrap: wrap;
		     justify-content: space-between;
		     `;

        let text = document.createElement('span');
        text.classList.add('text');
        text.innerHTML = `
			Lorem ipsum dolor sit amet, 
			consectetur adipisicing elit.
			 Praesentium exercitationem
			  consectetur quisquam nemo 
			  eveniet iure cum explicabo
			   suscipit fugit, rerum, nam 
			   nulla quasi fuga incidunt
			    laudantium, provident sint 
			    ratione. Laboriosam animi
			     mollitia sed quos voluptates
			      cum iusto, itaque, repellendus
			       nobis dicta aliquam nulla
			        ducimus tempora aliquid 
			        facilis dolore repudiandae illum!
			`
        let block = document.createElement('div')
        block.style.cssText = `
			width: 30%;
			min-height: 100px;
			border: 1px solid #fff;
			border-radius: 10px;
			color: #fff;
			display: flex;
			padding: 20px;
			margin-bottom: 20px;
			`;

        block.appendChild(text);
        block.classList.add('block');

        let block2 = block.cloneNode(true);

        body.appendChild(header);
        body.appendChild(container);

        for (var i = 0; i < 6; i++) {
            container.appendChild(block.cloneNode(true))
        }



    });




});