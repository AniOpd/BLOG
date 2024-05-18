import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
            <div className="text-center">
                    <h1 className="text-2xl font-bold">{post.title.toUpperCase()}</h1>
                </div>
                <div className="grid justify-items-center rounded-xl my-4 h-3/6">
                    <img
                        className="max-h-52 max-w-md rounded-xl"
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                    />
                </div>

                <div className="browser-css py-2">
                    {parse(post.content)}
                    </div>

                    {isAuthor && (
                        <div className="flex justify-center">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500 hover:bg-red-900" className="mr-3 ">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500 hover:bg-blue-700" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}

            </Container>
        </div>
    ) : null;
}
