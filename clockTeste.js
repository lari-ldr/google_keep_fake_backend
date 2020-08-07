const nomeGrupo = "Zuera never ends"
const assunto = "Aviso de Quarentena"
const mensagem = "Doggo ipsum pats boof porgo boof bork smol borking doggo with a long snoot for pats, extremely cuuuuuute blep noodle horse clouds pupperino, you are doin me a concern porgo thicc super chub. Vvv dat tungg tho floofs smol borking doggo with a long snoot for pats, long water shoob doge. Long woofer aqua doggo borkf fat boi what a nice floof heck, much ruin diet ur givin me a spook smol very good spot, smol heckin most angery pupper I have ever seen boof. Many pats smol borking doggo with a long snoot for pats such treat, heckin angery woofer."
const intervalo = 60000 // 1 minuto em milisegundos
const horas = new Date();

const horaNormal = new Date(horas.getFullYear(), horas.getMonth(), horas.getDate(), horas.getHours(), horas.getMinutes(), horas.getSeconds(), horas.getMilliseconds())
console.log("horario normal: " + horaNormal)

// pegar a hora atual e disparar o aviso, nesse caso o aviso é disparado a cada 1 minuto
// interval = setInterval(function teste(){
//     console.log(nomeGrupo + assunto + mensagem)
// }, intervalo)

// ========

// PROXIMOS PASSOS:
// PEGAR A MENSAGEM DA DATABASE E MOSTRAR NO CONSOLE.LOG
// DEPOIS, PEGAR A MENSAGEM DA DATABASE E ENVIAR NO WHATSAPP

// const menosUmMinuto = new Date(horas.getFullYear(), horas.getMonth(), horas.getDate(), horas.getHours(), horas.getMinutes(), horas.getSeconds(), horas.getMilliseconds() - intervalo)
// const maisUmMinuto = new Date(horas.getFullYear(), horas.getMonth(), horas.getDate(), horas.getHours(), horas.getMinutes(), horas.getSeconds(), horas.getMilliseconds() + intervalo)
// console.log("horario menos 1 minuto: " + menosUmMinuto
// console.log("horario mais 1 minuto: " + maisUmMinuto)
