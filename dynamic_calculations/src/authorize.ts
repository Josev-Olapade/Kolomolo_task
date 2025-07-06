import Role from "./models/role";

// Role hierarchy from highest to lowest
const roleHierarchy = [
  Role.SYS_ADMIN,
  Role.LOCAL_ADMIN,
  Role.ENTERPRISE_USER,
  Role.BASIC_USER,
];

function authorize(user, action) {
  const userRoleIndex = roleHierarchy.indexOf(user.role);
  const actionRoleIndex = roleHierarchy.indexOf(action.role);
  if (userRoleIndex === -1 || actionRoleIndex === -1) return false;
  return userRoleIndex <= actionRoleIndex;
}

export default authorize;
