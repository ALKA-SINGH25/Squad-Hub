import {
  Flex,
  Image,
  Link,
  useColorMode,
  Avatar,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../../atoms/UserAtoms";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import useLogout from "../../hooks/useLogout";
import authScreenAtom from "../../atoms/AuthAtoms";
import { BsFillChatQuoteFill } from "react-icons/bs";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const [isHovered, setIsHovered] = useState(false);
  const logout = useLogout();
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  return (
    <Flex
      mt={6}
      mb="12"
      alignItems={"center"}
      justifyContent={"center"}
      gap={{ base: 70, lg: 40 }}
    >
      {user && (
        <Link as={RouterLink} to="/" _hover={{ color: "#FF9900" }}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link
          as={RouterLink}
          onClick={() => setAuthScreen("login")}
          to={"/auth"}
        >
          Login
        </Link>
      )}
      <Image
        cursor={"pointer"}
        alt="logo"
        w={180}
        src={colorMode === "dark" ? "/l.svg" : "/light.svg"}
        onClick={toggleColorMode}
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
      />

      {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to={`/${user.username}`}>
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={"sm"}
              boxShadow={
                isHovered
                  ? "0 0 3px 3px #ff9900d7, 0 0 3px 3px #ff990076, 0 0 1px 1px #ff990058"
                  : "md"
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
          </Link>
          <Link as={RouterLink} to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Button
            size={"xs"}
            onClick={logout}
            _hover={{ color: "#FF9900" }}
            bg={useColorModeValue("gray.300", "gray.dark")}
            py={3.5}
          >
            <FiLogOut size={20} />
          </Button>
        </Flex>
      )}
      {!user && (
        <Link
          as={RouterLink}
          to={"/auth"}
          onClick={() => setAuthScreen("signup")}
        >
          Sign up
        </Link>
      )}
    </Flex>
  );
};

export default Header;
