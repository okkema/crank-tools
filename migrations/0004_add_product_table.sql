CREATE TABLE `product` (
	`id` text PRIMARY KEY NOT NULL,
	`sku` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`price` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `product_sku_unique` ON `product` (`sku`);