class Role {
  static SYS_ADMIN = Symbol("sysadmin");
  static LOCAL_ADMIN = Symbol("localadmin");
  static ENTERPRISE_USER = Symbol("enterpriseuser");
  static BASIC_USER = Symbol("basicuser");

  static from(input) {
    if (input === "sysadmin") return Role.SYS_ADMIN;
    if (input === "localadmin") return Role.LOCAL_ADMIN;
    if (input === "enterpriseuser") return Role.ENTERPRISE_USER;
    if (input === "basicuser") return Role.BASIC_USER;
  }
}

export default Role;
