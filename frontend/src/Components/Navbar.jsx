import { Link } from "react-router-dom";
import { useAuthStore } from "../Store/useAuthStore";
import { useAdminStore } from "../Store/useAdminStore";
import { LogOut, MessageSquare, Settings, User, Shield, Users, Heart } from "lucide-react";
import { useFriendStore } from "../Store/useFriendStore";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const { adminUser } = useAdminStore();
  const { pendingRequests } = useFriendStore();

  return (
    <header
      className="bg-base-100 border-b border-base-200 fixed w-full top-0 z-40 
    backdrop-blur-md bg-base-100/95 shadow-sm"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all duration-200 group">
              <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-soft group-hover:shadow-lg transition-all duration-200">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold text-gradient hidden sm:block">Chatty</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className="btn btn-sm btn-ghost gap-2 hover:bg-base-200/80 rounded-lg"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/people"}
                  className="btn btn-sm btn-ghost gap-2 hover:bg-base-200/80 rounded-lg"
                >
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">People</span>
                </Link>

                <Link
                  to={"/friend-requests"}
                  className="btn btn-sm btn-ghost gap-2 hover:bg-base-200/80 rounded-lg relative"
                >
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Requests</span>
                  {pendingRequests.length > 0 && (
                    <span className="absolute top-1 right-1 size-5 bg-error text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {pendingRequests.length > 9 ? "9+" : pendingRequests.length}
                    </span>
                  )}
                </Link>
              </>
            )}

            {!authUser && !adminUser && (
              <Link
                to={"/admin/login"}
                className="btn btn-sm btn-ghost gap-2 hover:bg-base-200/80 rounded-lg"
                title="Admin Portal"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm btn-ghost gap-2 hover:bg-base-200/80 rounded-lg">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="btn btn-sm btn-ghost gap-2 hover:bg-error/10 text-error rounded-lg hover:text-error" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>  
        </div>
      </div>
    </header>
  );
};
export default Navbar;