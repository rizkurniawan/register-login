-- CreateTable
CREATE TABLE `user_account` (
    `id` VARCHAR(36) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `gender` CHAR(1) NOT NULL,
    `date_of_birth` DATE NOT NULL,
    `phone` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_login_data` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(200) NOT NULL,
    `password_hash` VARCHAR(100) NOT NULL,
    `password_salt` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,
    `user_account_id` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `user_login_data_email_key`(`email`),
    UNIQUE INDEX `user_login_data_user_account_id_key`(`user_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_login_data` ADD CONSTRAINT `user_login_data_user_account_id_fkey` FOREIGN KEY (`user_account_id`) REFERENCES `user_account`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
