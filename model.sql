create table notes (
	id serial PRIMARY KEY NOT NULL,
	title VARCHAR(1000) NOT NULL,
	content TEXT NOT NULL,
	created TIMESTAMP NOT NULL
);
insert into notes (id, title, content, created)
values (1, 'Zuera Never Ends', 'Doggo ipsum pats boof porgo boof bork smol borking doggo with a long snoot for pats, extremely cuuuuuute blep noodle horse clouds pupperino, you are doin me a concern porgo thicc super chub. Vvv dat tungg tho floofs smol borking doggo with a long snoot for pats, long water shoob doge. Long woofer aqua doggo borkf fat boi what a nice floof heck, much ruin diet ur givin me a spook smol very good spot, smol heckin most angery pupper I have ever seen boof. Many pats smol borking doggo with a long snoot for pats such treat, heckin angery woofer.', 'Wed Mar 25 2020 16:08:46');
