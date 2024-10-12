class Monster {
    constructor(name,level,health) {
        this.name = name;
        this.level = level;
        this.health = health;
    }
    static monsterNameText = document.querySelector("#monsterName");
    static monsterHealthText = document.querySelector("#monsterHealth");
}