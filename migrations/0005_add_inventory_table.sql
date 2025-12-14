CREATE TABLE `inventory` (
	`id` text PRIMARY KEY NOT NULL,
	`product` text NOT NULL,
	`quantity` integer NOT NULL,
	FOREIGN KEY (`product`) REFERENCES `product`(`id`) ON UPDATE no action ON DELETE no action
);
