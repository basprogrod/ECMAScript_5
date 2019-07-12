 let int = setInterval(function(){

             // if(!coords[loop].x  || !coords[loop].y) clearInterval(int);

            // while (1) {

              // if(loop > coords.length / mul - 3) break;
              if(loop > coords.length / mul - 3) clearInterval(int);
              loop++;
              // ctx.fillStyle = "rgba(65,7,7,0.01)"
              // ctx.fillRect(0,0,w,h);
              ctx.beginPath();
              ctx.moveTo(coords[loop].x, coords[loop].y);

              ctx.lineTo( coords[ result[loop](loop, mul) ].x, coords[result[loop](loop, mul)].y);

              ctx.strokeStyle = `rgba(255,255,255,0.3)`;

              ctx.stroke();

            // }

            



             // console.log(result[loop](loop, 2))
           
             

         },speed)